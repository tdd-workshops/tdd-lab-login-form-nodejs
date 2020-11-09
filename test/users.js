const request = require('supertest')
const app = require('../app')

describe('POST /users', function () {
  it('login with username and password', function (done) {
    request(app)
      .post('/users')
      .send('email=demo@example.com&password=demo1234')
      .expect(302, /\/welcome/, done)
  })
})
