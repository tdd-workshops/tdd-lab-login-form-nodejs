const db = require('./init')

const users = db.addCollection('users')

module.exports = users
