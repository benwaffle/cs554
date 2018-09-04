const express = require('express')
const app = express()
const router = express.Router()
const db = require('./db')
const { isTask, isComment } = require('./validate')

app.use(require('body-parser').json())

// middleware 1: logger
app.use((req, res, next) => {
    const query = Object.entries(req.query).map(([key, value]) => `${key}=${value}`).join('&')
    console.log(`${req.method} ${req.path}${query ? '?' + query : ''}`)
    if (Object.keys(req.body).length > 0) {
        console.log('Body:', req.body)
    }

    next()
})

// middleware 2: counter
const count = {}
app.use(({ path }, res, next) => {
    if (!(path in count))
        count[path] = 0

    count[path]++

    console.log(`Count for ${path} is ${count[path]}\n`)

    next()
})

/**
 * @param {express.RequestHandler} fn 
 */
const handleErrors = fn => (req, res, next) => fn(req, res, next).catch(next)

// Responds with an array of all tasks in the format of {id: TASK_ID, title: TASK_TITLE} 
router.get('/', handleErrors(async (req, res) => {
    const skip = parseInt(req.query.skip) || 0
    let take = Math.min(parseInt(req.query.take) || 20, 100)
    res.json(await db.getAll(skip, take))
}))

// Responds with the full content of the specified task
router.get('/:id', handleErrors(async (req, res) => {
    try {
        res.json(await db.get(req.params.id))
    } catch (e) {
        res.status(404).json({error: e})
    }
}))

// Creates a task with the supplied data in the request body, and returns the new task
router.post('/', handleErrors(async (req, res) => {
    const task = req.body

    if (!isTask(task)) {
        res.status(400).json({error: 'invalid task submitted'})
        return
    }

    const id = await db.create(task)
    res.json(await db.get(id))
}))

// Updates the specified task with by replacing the task with the new task content, and returns the updated task
router.put('/:id', handleErrors(async (req, res) => {
    const task = req.body

    if (!isTask(task)) {
        res.status(400).json({error: 'invalid task submitted'})
        return
    }
    
    await db.put(req.params.id, task)
    res.json(await db.get(req.params.id))
}))

// Updates the specified task with only the supplied changes, and returns the updated task
router.patch('/:id', handleErrors(async (req, res) => {
    const task = req.body

    if (!isTask(task, true)) {
        res.status(400).json({error: 'invalid task submitted'})
        return
    }

    if (task.comments) {
        res.status(400).json({error: 'you cannot change comments with PATCH'})
        return
    }

    await db.patch(req.params.id, task)
    res.json(await db.get(req.params.id))
}))

router.post('/:id/comments', handleErrors(async (req, res) => {
    const comment = req.body

    if (!isComment(comment)) {
        res.status(400).json({error: 'invalid comment submitted'})
        return
    }

    res.status(201).json(await db.pushComment(req.params.id, comment))
}))

router.delete('/:taskId/:commentId', handleErrors(async (req, res) => {
    await db.deleteComment(req.params.taskId, req.params.commentId)
    res.status(202).end()
}))

/*
// Deletes the task and returns nothing
router.delete('/:id', handleErrors(async (req, res) => {
    await db.delete(req.params.id)
    res.status(200).end()
}))
*/

app.use('/api/tasks', router)

// unhandled path or error
app.use((err, req, res, next) => {
    res.status(err.status || 400).json({
        error: err,
        message: err.message,
        stack: err.stack
    })
})

module.exports = app