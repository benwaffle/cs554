const fs = require('fs')
const data = JSON.parse(fs.readFileSync(`${__dirname}/../data.json`).toString())

function getById(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const person = data.find(d => d.id === id)
      if (person)
        resolve(person)
      else
        reject(new Error(`no such ID ${id}`))
    }, 5000)
  })
}

module.exports = {
  getById
}