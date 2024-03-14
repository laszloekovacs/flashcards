type FlashCard = {
	// optional ordering of the document
	order?: number

	// group
	topic: string

	// optional title of the concept
	title?: string

	// markdown text of the note
	body: string
}
