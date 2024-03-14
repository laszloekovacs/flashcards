import { MDXEditor } from '~/editor.client'
import { ClientOnly } from 'remix-utils/client-only'
import { LinksFunction } from '@remix-run/node'
import {
	headingsPlugin,
	listsPlugin,
	markdownShortcutPlugin,
	quotePlugin,
	thematicBreakPlugin
} from '@mdxeditor/editor'

export default function EditorPage() {
	return (
		<ClientOnly fallback={<p>loading...</p>}>
			{() => (
				<MDXEditor
					plugins={[
						headingsPlugin(),
						listsPlugin(),
						quotePlugin(),
						thematicBreakPlugin(),
						markdownShortcutPlugin()
					]}
					markdown='hello world'
				/>
			)}
		</ClientOnly>
	)
}
