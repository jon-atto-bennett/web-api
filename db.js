module.exports = {

  getUsers: getUsers,
  getUser: getUser,
  addUser: addUser
}

function getUsers (knex) {
  return knex('users').select()

}

function getUser (id, knex) {
  return knex('users').where('id', id)
}

function addUser (user,knex) {
  return knex('users').insert(user)
}
