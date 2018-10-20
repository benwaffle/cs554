const app = require('express')()

const data = require('./data')

const redis = require('redis')
const client = redis.createClient()

require('bluebird').promisifyAll(redis.RedisClient.prototype)
require('bluebird').promisifyAll(redis.Multi.prototype)

const key = 'cache'

async function readCache(end) {
  return (await client.lrangeAsync(key, 0, end)).map(JSON.parse)
}

app.get('/api/people/history', async (req, res) => {
  try {
    res.json(await readCache(19))
  } catch (e) {
    res.status(500).json({error: e.message})
  }
})

app.get('/api/people/:id', async (req, res) => {
  const cache = await readCache(-1)
  const id = parseInt(req.params.id)

  let person = cache.find(d => d.id === id)
  if (person) {
    res.json(person)
  } else {
    try {
      person = await data.getById(id)
      res.json(person)
    } catch (e) {
      return res.status(404).json({error: e.message})
    }
  }

  await client.lpushAsync(key, JSON.stringify(person))
})

app.listen(3000, () => console.log('http://localhost:3000'))