const { MongoClient, ObjectID } = require('mongodb')

const conn = MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true })

const coll = conn
    .then(c => c.db('Iofel-Benjamin-CS554-Lab1'))
    .then(db => db.collection('tasks'))

function makeId(id) {
    try {
        return new ObjectID(id)
    } catch (e) {
        throw `no such task: ${id}`
    }
}

module.exports = {
    async getAll(offset, limit) {
        const db = await coll
        return await db.find().skip(offset).limit(limit).toArray()
    },

    async get(_id) {
        const db = await coll
        const task = await db.findOne({ _id: makeId(_id) })
        if (task == null)
            throw `no such task: ${_id}`
        return task
    },

    async create(task) {
        const db = await coll
        const res = await db.insertOne(task)
        return res.insertedId
    },

    async put(_id, task) {
        await this.delete(_id)
        return await this.create({ _id: makeId(_id), ...task })
    },

    async patch(_id, task) {
        const db = await coll
        const res = await db.updateOne({ _id: makeId(_id) }, { $set: task })
        if (res.matchedCount === 0)
            throw {status: 404, error: `no such task: ${task.id}`}
    },

    async pushComment(_id, comment) {
        const db = await coll
        const res = await db.updateOne(
            { _id: makeId(_id) },
            {
                $push: {
                    comments: {
                        _id: new ObjectID(),
                        ...comment
                    }
                }
            }
        )
        if (res.matchedCount === 0)
            throw {status: 404, error: `no such task: ${_id}`}
    },

    async deleteComment(taskId, commentId) {
        const db = await coll
        const res = await db.updateOne(
            { _id: makeId(taskId) },
            {
                $pull: {
                    comments: {
                        _id: makeId(commentId)
                    }
                }
            }
        )
        if (res.matchedCount === 0)
            throw {status: 404, error: `no such task or comment`}
    },

    async delete(_id) {
        const db = await coll
        const res = await db.deleteOne({ _id: makeId(_id) })
        if (res.deletedCount === 0)
            throw {status: 404, error: `no such task: ${_id}`}
    },

    async deleteAll() {
        const db = await coll
        await db.drop()
    },

    async close() {
        await (await conn).close()
    }
}