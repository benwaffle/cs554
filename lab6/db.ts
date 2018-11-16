import { MongoClient, ObjectID, UpdateQuery } from 'mongodb'
import { Task, Comment } from './types'

const conn = MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true })

const coll = conn
    .then(c => c.db('Iofel-Benjamin-CS554-Lab1'))
    .then(db => db.collection<Task>('tasks'))

function makeId(id: string) {
    try {
        return new ObjectID(id)
    } catch (e) {
        throw {status: 404, error: `no such task: invalid ID: ${id}`}
    }
}

export async function getAll(offset: number, limit: number) {
    const db = await coll
    return await db.find().skip(offset).limit(limit).toArray()
}

export async function get(_id: string) {
    const db = await coll
    const task = await db.findOne({ _id: makeId(_id) })
    if (task == null)
        throw `no such task: ${_id}`
    return task
}

export async function create(task: Task) {
    const db = await coll
    const res = await db.insertOne(task)
    return res.insertedId
}

export async function put(_id: string, task: Task) {
    await deleteOne(_id)
    return await create({ _id: makeId(_id), ...task })
}

export async function patch(_id: string, task: Task) {
    const db = await coll
    const res = await db.updateOne({ _id: makeId(_id) }, { $set: task })
    if (res.matchedCount === 0)
        throw {status: 404, error: `no such task: ${task._id}`}
}

export async function pushComment(_id: string, comment: Comment) {
    const db = await coll
    const data = {
        _id: new ObjectID(),
        ...comment
    }
    const res = await db.updateOne(
        { _id: makeId(_id) },
        {
            $push: {
                comments: data
            }
        }
    )
    if (res.matchedCount === 0)
        throw {status: 404, error: `no such task: ${_id}`}
    return data
}

export async function deleteComment(taskId: string, commentId: string) {
    const db = await coll
    const res = await db.updateOne(
        { _id: makeId(taskId) },
        {
            $pull: {
                comments: {
                    _id: makeId(commentId)
                }
            } as any // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/29911
        }
    )
    if (res.modifiedCount === 0)
        throw {status: 404, error: `no such task or comment`}
}

export async function deleteOne(_id: string) {
    const db = await coll
    const res = await db.deleteOne({ _id: makeId(_id) })
    if (res.deletedCount === 0)
        throw {status: 404, error: `no such task: ${_id}`}
}

export async function deleteAll() {
    const db = await coll
    await db.deleteMany({})
}

export async function close() {
    await (await conn).close()
}