const request = require('supertest')
const app = require('../app')

describe('POST /users', function () {
  // This will preserve the session and cookies between requests
  const agent = request.agent(app)

  it('log in with short password should redirect', function (done) {
    // We expect login with a short password to redirect with a message
    agent
      .post('/users')
      .send({ email: 'demo@example.com', password: 'demo1234' })
      .expect(302, /\/users\/welcome\?msg=password_too_short/, done)
  })

  it('warn user that password is too short', function (done) {
    // After the redirect, we expect the welcome page to show a warning to the user
    agent
      .get('/users/welcome?msg=password_too_short')
      .redirects(5)
      .expect(200, /Your password is too short/, done)
  })
})
