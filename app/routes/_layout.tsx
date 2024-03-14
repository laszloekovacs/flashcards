import { Link, Outlet } from '@remix-run/react'

export default function Layout() {
	return (
		<div>
			<header>
				<h1 className='display-6'>Dont just read, Practice!</h1>
				<nav>
					<li>
						<Link
							to='/'
							className='link-offset-2 link-underline link-underline-opacity-25'>
							Home
						</Link>
					</li>
					<li>
						<a
							href='/about'
							className='link-offset-2 link-underline link-underline-opacity-25'>
							github
						</a>
					</li>
				</nav>
			</header>

			<main>
				<Outlet />
			</main>
		</div>
	)
}
