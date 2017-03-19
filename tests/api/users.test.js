// Note: we use AVA here because it makes setting up the
// conditions for each test relatively simple. The same
// can be done with Tape using a bit more code.

var test = require('ava')
var request = require('supertest');

var db = require('../../db')
var app = require('../../server')
var setup_db = require('../setup_db')

setup_db(test, function(db) {
  app.set('knex', db)
})

test.cb('getUsers gets all users', function (t) {
  request(app)
    .get('/users/')
    .expect('Content-Type', /json/)
    .expect(200)
    .end(function(err, res) {
      if (err) throw err
      t.is(26, res.body.users.length)
      t.end()
    })
})

test.cb('getUser gets user by id', function (t) {
  request(app)
    .get('/users/99904')
    .expect('Content-Type', /json/)
    .expect(200)
    .end(function(err, res) {
      if (err) throw err
      t.deepEqual({id: 99904, name: 'Dilapidated Duck', email: 'duck@example.org'}, res.body.users[0])
      t.end()
    })
})

test.cb('addUser adds a new user', function (t) {
  request(app)
    .post('/users/')
    .send({name: 'Nemo' , email: 'nemo@thesea.com'})
    .expect('Content-Type', /json/)
    .expect(200)
    .end(function(err, res) {
      if (err) throw err
      t.is(1, res.body.users.length)
      t.end()
    })
})
