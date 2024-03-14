import { LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import invariant from 'tiny-invariant'

export const loader = ({ params }: LoaderFunctionArgs) => {
	invariant(params.topic, 'topic is required')
	return { topic: params.topic }
}

export default function TopicPage() {
	const { topic } = useLoaderData<typeof loader>()

	return (
		<div>
			<h1>{topic}</h1>

			<div></div>
		</div>
	)
}
