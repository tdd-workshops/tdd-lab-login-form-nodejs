const request = require('supertest')
const app = require('../app')

describe('POST /users', function () {
  it('warns user that password is too short', function (done) {
    // We expect login with a short password to display a warning
    request.agent(app)
      .post('/users')
      .send({ email: 'demo@example.com', password: 'demo1234' })
      .redirects(5)
      .expect(200, /Your password is too short/, done)
  })

  it('log in with username and password', function (done) {
    // We expect login with a good password to redirect to the welcome page
    request.agent(app)
      .post('/users')
      .send({ email: 'demo@example.com', password: 'betterPassword3!Q5' })
      .redirects(5)
      .expect(200, /Welcome back/, done)
  })
})
