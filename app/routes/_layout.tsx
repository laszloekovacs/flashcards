import { Form, Link, Outlet } from '@remix-run/react'

export default function Layout() {
	return (
		<div>
			<header>
				<h1 className='display-6'>Dont just read, Practice!</h1>
				<nav>
					<li>
						<Link to='/'>Home</Link>
					</li>
					<li>
						<a href='/about'>github</a>
					</li>
				</nav>
				<Form method='POST'>
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
							placeholder='Write your notes heres...'></textarea>
					</div>

					<button className='btn btn-outline-secondary' type='submit'>
						Add New
					</button>
				</Form>
			</header>

			<main>
				<Outlet />
			</main>
		</div>
	)
}
