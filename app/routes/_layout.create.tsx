import { ActionFunctionArgs } from '@remix-run/node'
import { useFetcher } from '@remix-run/react'
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

export default function CreateNote() {
	const fetcher = useFetcher()

	return (
		<fetcher.Form method='POST'>
			<fieldset disabled={fetcher.state != 'idle'}>
				<div className='input-group mb-4'>
					<label htmlFor='topic' className='input-group-text'>
						New Topic (required)
					</label>
					<input
						type='text'
						className='form-control'
						name='topic'
						placeholder='New Topic'
						required
					/>
				</div>

				<div className='input-group mb-4'>
					<label htmlFor='title' className='input-group-text'>
						Title
					</label>
					<input
						type='text'
						className='form-control'
						name='title'
						placeholder='Title'
					/>
				</div>

				<div className='mb-4'>
					<label htmlFor='notes' className='mb-2'>
						Notes
					</label>
					<textarea
						className='form-control'
						name='notes'
						placeholder='Write your notes heres...'
						required></textarea>
				</div>

				<button
					className='btn btn-outline-secondary'
					type='submit'
					name='intent'
					value='CREATE_NOTE'>
					{fetcher.state == 'loading' ? 'Creating...' : 'Create'}
				</button>
			</fieldset>
		</fetcher.Form>
	)
}
