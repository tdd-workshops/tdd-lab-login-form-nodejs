const request = require('supertest')
const app = require('../app')

describe('POST /users', function () {
  it('log in with username and password', function (done) {
    request.agent(app)
      .post('/users')
      .send({ email: 'demo@example.com', password: 'demo1234' })
      .redirects(5)
      .expect(200, /Welcome back/, done)
  })
})
