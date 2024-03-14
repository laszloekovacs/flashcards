import { ActionFunctionArgs } from '@remix-run/node'
import { WithId } from 'mongodb'
import invariant from 'tiny-invariant'
import { db } from '~/services.server'

export const action = async ({ request }: ActionFunctionArgs) => {
	const formData = await request.formData()

	const topic = formData.get('topic') as string
	const title = formData.get('title') as string
	const notes = formData.get('notes') as string

	invariant(topic, 'topic is required')
	invariant(notes, 'notes is required')

	// insert into database
	const insertionResult = await db.cards.insertOne({
		topic,
		title,
		notes
	} as WithId<FlashCard>)

	invariant(insertionResult.acknowledged, 'failed to create')

	return new Response('created', { status: 201 })
}
