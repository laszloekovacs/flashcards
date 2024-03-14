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

			{topics.length && <TopicTable topics={topics} />}

			{topics.length === 0 && <p>No notes are available, create more!</p>}
		</div>
	)
}

export const TopicTable = ({ topics }: { topics: string[] }) => {
	return (
		<table className='table'>
			<thead>
				<tr>
					<th scope='col'>Topic</th>
				</tr>
			</thead>
			<tbody>
				{topics.map(topic => (
					<tr>
						<td>
							<Link to={`/topic/${topic}`}>{topic}</Link>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	)
}
