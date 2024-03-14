import { MongoClient, ObjectId } from 'mongodb'
/**
 * Singletons. puts / gets the value in the global scope. see:
 * https://github.com/remix-run/examples/blob/main/_official-blog-tutorial/app/singleton.server.ts
 *
 * usage:
 *
 * export const db = singleton("prisma", () => new PrismaClient());
 *
 * import as usual
 */

export const singleton = <Value>(
	name: string,
	valueFactory: () => Value
): Value => {
	const g = global as any
	g.__singletons ??= {}
	g.__singletons[name] ??= valueFactory()
	return g.__singletons[name]
}

const { MONGODB_CONNECTION_STRING, MONGODB_DATABASE } = process.env

if (typeof MONGODB_CONNECTION_STRING !== 'string') {
	throw new Error('MONGODB_CONNECTION_STRING is not defined')
}

if (typeof MONGODB_DATABASE !== 'string') {
	throw new Error('MONGODB_DATABASE is not defined')
}

export const mongodb = singleton(
	'mongodb',
	() => new MongoClient(MONGODB_CONNECTION_STRING)
)

export const db = {
	cards: mongodb.db(MONGODB_DATABASE).collection('cards')
}

export const toObjectId = (id: string) => new ObjectId(id)
