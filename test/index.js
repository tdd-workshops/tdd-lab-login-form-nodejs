const request = require('supertest')
const app = require('../app')

describe('GET /', function () {
  it('responds with login form', function (done) {
    request(app)
      .get('/')
      .expect(200, /Welcome to the Login Form Demo/, done)
  })
})
