import { Form, useFetcher } from '@remix-run/react'

export const NoteInput = () => {
	const fetcher = useFetcher()

	return (
		<fetcher.Form method='POST' action='/api'>
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
