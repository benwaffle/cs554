const fs = require('fs')
const request = require('supertest')
const app = require('./app')
const db = require('./db')

const gym = {
    title: 'go to gym',
    description: 'exercise',
    hoursEstimated: 1,
    completed: false
}

const yoga = {
    title: 'do yoga',
    description: 'stretch',
    hoursEstimated: 2,
    completed: false
}

test('GET /', async () => {
    const res = await request(app).get('/api/tasks')
    expect(res.status).toBe(200)
    expect(res.body).toEqual([])
})

test('POST /', async () => {
    const res = await request(app).post('/api/tasks').send(gym)

    expect(res.status).toBe(200)
    expect(res.body._id).toBeDefined()
    expect(res.body).toEqual({
        _id: res.body._id,
        ...gym
    })

    const res2 = await request(app).get('/api/tasks')
    expect(res2.body).toEqual([res.body])
})

test('GET /api/tasks/:id', async () => {
    const res = await request(app).post('/api/tasks').send(gym)
    expect(res.status).toBe(200)
    console.log(res.body)

    const res2 = await request(app).get(`/api/tasks/${res.body._id}`)
    expect(res2.status).toBe(200)
    expect(res2.body).toEqual(res.body)
})

test('PUT', async () => {
    const res = await request(app).post('/api/tasks').send(gym)
    expect(res.status).toBe(200)
    const _id = res.body._id

    const res2 = await request(app).put(`/api/tasks/${_id}`).send(yoga)
    expect(res2.status).toBe(200)
    expect(res2.body).toEqual({ _id, ...yoga })
})

test('PUT non-existing task', async () => {
    const res = await request(app).put(`/api/tasks/asdf`).send(gym)
    expect(res.status).toBe(404)
})

test('PATCH /', async () => {
    const res = await request(app).post('/api/tasks').send(gym)
    expect(res.status).toBe(200)
    const _id = res.body._id

    const res2 = await request(app).patch(`/api/tasks/${_id}`).send({
        title: 'patched'
    })
    expect(res2.status).toBe(200)
    expect(res2.body).toEqual({
        _id,
        ...gym,
        title: 'patched'
    })

    const res3 = await request(app).get(`/api/tasks/${_id}`)
    expect(res3.body).toEqual({
        _id,
        ...gym,
        title: 'patched'
    })
})

test('PATCH non-existing recipe', async () => {
    const res = await request(app).patch(`/api/tasks/asdf`).send({ title: 'patched' })
    expect(res.status).toBe(404)
})

test('comments', async () => {
    const res = await request(app).post('/api/tasks').send(gym)
    expect(res.status).toBe(200)
    const _id = res.body._id

    const comment = {
        name: 'Ben',
        comment: 'Cool!'
    }
    const res2 = await request(app).post(`/api/tasks/${_id}/comments`).send(comment)
    const cid = res2.body._id

    const res3 = await request(app).get(`/api/tasks/${_id}`)
    expect(res3.body.comments).toEqual([res2.body])

    const res4 = await request(app).delete(`/api/tasks/${_id}/${cid}`)
    expect(res4.status).toBe(202)

    const res5 = await request(app).get(`/api/tasks/${_id}`)
    expect(res5.body.comments.length).toBe(0)
})

afterAll(async () => {
    await db.deleteAll()
    await db.close()
})