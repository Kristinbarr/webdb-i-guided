const express = require('express')

// database access using knex
const db = require('../data/db-config.js')

const router = express.Router()

router.get('/', (req, res) => {
  // this selects all columns
  // db.select('*').from('posts').then((posts) => {
  //     res.status(200).json(posts)
  // })

  // this selects only id, title and contents columns
  db('accounts')
    .select('id', 'title', 'contents')
    .then((posts) => {
      res.status(200).json(posts)
    })
    .catch((err) => {
      res.json(err)
    })
})

router.get('/:id', (req, res) => {
  const { id } = req.params
  db('posts')
    .where({ id }) // always returns an array
    .first() // returns first item in the returned array
    .then((post) => {
      res.status(200).json(post)
    })
    .catch((err) => {
      res.json(err)
    })
})

router.post('/', (req, res) => {
  const postData = req.body
  // validate the postData before inserting into db
  db('posts')
    .insert(postData, 'id') // will get warning in console
    .then(([id]) => {
      db('posts')
        .where({ id }) // always returns an array
        .first() // returns first item in the returned array
        .then((post) => {
          res.status(200).json(post)
        })
    })
    .catch((err) => {
      res.json(err)
    })
})

router.put('/:id', (req, res) => {
  const changes = req.body
  db('posts')
    .where('id', req.params.id) // filter first, target the right values
    .update(changes) //
    .then(count => {
      res.status(200).json({ message: `updated ${count} records`})
    })
    .catch(err => {
      res.json(err)
    })
})

router.delete('/:id', (req, res) => {
  // delte from posts where...
  db('posts')
    .where({ id: req.params.id })
    .del()
    .then((count) => {
      res.status(200).json({ message: `deleted ${count} records` })
    })
    .catch((err) => {
      res.json(err)
    })
})

module.exports = router
