const express = require('express')
const app = express()

app.set('view engine', 'pug')

app.use('/public', express.static('public'))

app.get('/', (req, res) => {
  res.render('main', {
    products: [
      {
        id: 'cheese',
        name: 'Cheese Wheel',
        img: 'cheese.jpg'
      },
      {
        id: 'glasses',
        name: 'Sunglasses',
        img: 'glasses.jpg'
      },
      {
        id: 'lens',
        name: 'Camera Lens',
        img: 'lens.jpg'
      },
      {
        id: 'milk',
        name: 'Milk',
        img: 'milk.jpg'
      },
      {
        id: 'watch',
        name: 'Wrist Watch',
        img: 'watch.jpg'
      }
    ]
  })
})

app.listen(3000, () => console.log('http://localhost:3000'))