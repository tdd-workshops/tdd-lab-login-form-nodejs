const request = require('supertest')
const app = require('../app')

describe('POST /users', function () {
  it('log in with username and password', function (done) {
    request.agent(app)
      .post('/users')
      .send({ email: 'demo@example.com', password: 'g00dpass99^%&' })
      .redirects(5)
      .expect(200, /Welcome back/, done)
  })

  it('should reject short passwords', function (done) {
    request.agent(app)
      .post('/users')
      .send({ email: 'demo@example.com', password: 'demo1234' })
      .redirects(5)
      .expect(200, /Password must be at least/, done)
  })

  it('should reject password without a number', function (done) {
    request.agent(app)
      .post('/users')
      .send({ email: 'demo@example.com', password: 'demodemodemodemo' })
      .redirects(5)
      .expect(200, /Password must contain a number/, done)
  })

  it('should reject password without a symbol', function (done) {
    request.agent(app)
      .post('/users')
      .send({ email: 'demo@example.com', password: 'demo1234567890' })
      .redirects(5)
      .expect(200, /Password must contain a symbol/, done)
  })

  it('should fail on wrong password', function (done) {
    request.agent(app)
      .post('/users')
      .send({ email: 'demo@example.com', password: 'demo1234567890^&!' })
      .redirects(5)
      .expect(200, /Invalid user login/, done)
  })
})
