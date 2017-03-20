module.exports = {

  getUsers: getUsers,
  getUser: getUser,
  addUser: addUser,
  updateUser: updateUser
}

function getUsers (knex) {
  return knex('users').select()
}

function getUser (id, knex) {
  return knex('users').where('id', id)
}

function addUser (user, knex) {
  return knex('users').insert(user)
}

function updateUser(id, user, knex){
  return knex('users').select().where('id', id).update(user)
}
