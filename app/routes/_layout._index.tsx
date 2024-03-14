import { json, type MetaFunction } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
import { db } from '~/services.server'

export const meta: MetaFunction = () => {
	return [
		{ title: 'New Remix App' },
		{ name: 'description', content: 'Welcome to Remix!' }
	]
}

export const loader = async () => {
	const topics = await db.cards.distinct('topic')
	return json({ topics })
}

export default function Index() {
	const { topics } = useLoaderData<typeof loader>()

	return (
		<div>
			<h2>Pick a topic to practice</h2>
			{topics.length > 0 && (
				<ul>
					{topics.map(topic => (
						<TopicListItem key={topic} topic={topic} />
					))}
				</ul>
			)}

			{topics.length === 0 && <p>No notes are available, create more!</p>}
		</div>
	)
}

export const TopicListItem = ({ topic }: { topic: string }) => (
	<li>
		<Link to={`/${topic}`}>{topic}</Link>
	</li>
)
