import { cssBundleHref } from '@remix-run/css-bundle'
import type { LinksFunction } from '@remix-run/node'
import {
	Links,
	LiveReload,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration
} from '@remix-run/react'

export const links: LinksFunction = () => [
	{
		rel: 'stylesheet',
		href: '	https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css'
	}
]

export default function App() {
	return (
		<RootLayout>
			<Outlet />
		</RootLayout>
	)
}

export const RootLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<html lang='en'>
			<head>
				<meta charSet='utf-8' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<Meta />
				<Links />
			</head>
			<body className='container-md'>
				{children}
				<ScrollRestoration />
				<Scripts />
				<LiveReload />
			</body>
		</html>
	)
}
