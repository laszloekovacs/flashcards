import { Link, Outlet } from '@remix-run/react'
import { NoteInput } from '~/components/note-input'

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
				<NoteInput />
			</header>

			<main>
				<Outlet />
			</main>
		</div>
	)
}
