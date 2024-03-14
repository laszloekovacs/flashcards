import { json, type MetaFunction } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
import { db } from '~/services.server'

export const meta: MetaFunction = () => {
	return [
		{ title: 'Flashcard app' },
		{ name: 'description', content: 'Learn by repetition' }
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
				<ul className='list-group list-group-flush'>
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
	<li className='list-group-item'>
		<Link
			to={`/${topic}`}
			className='link-offset-2 link-underline link-underline-opacity-25'>
			{topic}
		</Link>
	</li>
)
