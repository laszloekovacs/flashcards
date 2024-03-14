import { ActionFunctionArgs } from '@remix-run/node'
import invariant from 'tiny-invariant'
import { db } from '~/services.server'

export const action = async ({ request }: ActionFunctionArgs) => {
	const formData = await request.formData()

	const topic = formData.get('topic') as string
	const title = formData.get('title') as string
	const notes = formData.get('notes') as string

	invariant(topic, 'topic is required')
	invariant(notes, 'notes is required')

	console.log({ topic, title, notes })

	// insert into database
	const insertionResult = await db.cards.insertOne({
		topic,
		title,
		notes,
		createdAt: new Date()
	})

	if (insertionResult.acknowledged == false) {
		return new Response('failed to create', { status: 500 })
	}

	return new Response('created', { status: 201 })
}
