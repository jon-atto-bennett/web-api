var express = require('express')
var router = express.Router()

var db = require('../db')

router.get ('/', function (req, res) {
  db.getUsers(req.app.get('knex'))
    .then(function (users) {
      res.send({ users: users })
    })
    .catch(function (err) {
      res.status(500).send('DATABASE ERROR: ' + err.message)
    })
})

router.get ('/:id', function (req, res) {
  var id = req.params.id
  var knex = req.app.get('knex')
  db.getUser(id, knex)
    .then(function (users) {
      res.send({ users: users })
    })
    .catch(function (err) {
      res.status(500).send('DATABASE ERROR: ' + err.message)
    })
})

router.post ('/', function (req, res) {
  var knex = req.app.get('knex')
  db.addUser(req.body, knex)
    .then(function (results) {
    res.status(201).json(results[0])
  })
})

router.put('/:id', function (req, res) {
  var id = req.params.id
  console.log('here', id);
  var user = req.body
  var knex = req.app.get('knex')
  db.updateUser(id, user, knex)
    .then(function (update) {
      res.status(200).json(update[0])
    })
})



module.exports = router
