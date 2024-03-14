import { LoaderFunctionArgs } from '@remix-run/node'
import { useFetcher, useLoaderData } from '@remix-run/react'
import Markdown from 'react-markdown'
import invariant from 'tiny-invariant'
import { db, toObjectId } from '~/services.server'

export const loader = async ({ params }: LoaderFunctionArgs) => {
	invariant(params.topic, 'topic is required')

	// return the first card with the highest score
	const card = await db.cards.findOne(
		{ topic: params.topic },
		{ sort: { score: -1 } }
	)

	invariant(card, 'could not find a card')

	const { _id, ...data } = card
	return { data, _id: _id.toString() }
}

export const action = async ({ request, params }: LoaderFunctionArgs) => {
	const formData = await request.formData()
	const intent = formData.get('intent') as string
	const _id = formData.get('_id') as string

	invariant(intent, 'intent is required')
	invariant(_id, '_id is required')
	invariant(params.topic, 'topic is required')

	// increase all scores in the topic by 1
	const updateResult = await db.cards.updateMany(
		{ topic: params.topic },
		{ $inc: { score: 1 } }
	)

	invariant(updateResult.acknowledged, 'could not update scores')

	// find out how many cards do we have in this topic
	const count = await db.cards.countDocuments({ topic: params.topic })
	invariant(count, 'could not get the number of cards')

	// set the score of this card to count / 2
	if (intent === 'SHOW_MORE') {
		console.log('show more')
		const amount = Math.ceil(count / 2)

		const updateResult = await db.cards.updateOne(
			{ _id: toObjectId(_id) },
			{ $set: { score: amount } }
		)

		invariant(updateResult.acknowledged, 'could not update score')

		// increment the score to the max score
	} else if (intent === 'SHOW_LESS') {
		console.log('show less')

		const updateResult = await db.cards.updateOne(
			{ _id: toObjectId(_id) },
			{ $set: { score: 0 } }
		)

		invariant(updateResult.acknowledged, 'could not update score')
	}

	return null
}

export default function TopicPage() {
	const { _id, data } = useLoaderData<typeof loader>()

	return (
		<div>
			<Card {...{ _id, data }} />
		</div>
	)
}

export const Card = ({ _id, data }: { _id: string; data: FlashCard }) => {
	const fetcher = useFetcher()

	return (
		<div>
			<h2>{data.title ?? 'no title'}</h2>
			{data?.score && <small>{data.score}</small>}
			<Markdown>{data.notes}</Markdown>

			<fetcher.Form method='POST'>
				<input type='hidden' name='_id' value={_id} />
				<button name='intent' value='SHOW_MORE' className='btn btn-warning'>
					Show More
				</button>
				<button name='intent' value='SHOW_LESS' className='btn btn-info'>
					Show Less
				</button>
			</fetcher.Form>
		</div>
	)
}
