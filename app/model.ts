type FlashCard = {
	// optional ordering of the document
	score?: number

	// group
	topic: string

	// optional title of the concept
	title?: string

	// markdown text of the note
	notes: string
}
