const request = require('supertest')
const app = require('../app')

describe('POST /users', function () {
  const agent = request.agent(app)

  it('log in with username and password', function (done) {
    agent
      .post('/users')
      .send('email=demo@example.com&password=demo1234')
      .expect(302, /\/users\/welcome/, done)
  })

  it('display welcome page after login', function (done) {
    agent
      .get('/users/welcome')
      .expect(200, /Welcome back/, done)
  })
})
