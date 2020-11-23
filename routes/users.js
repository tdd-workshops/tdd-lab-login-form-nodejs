const express = require('express')
const router = express.Router()

const USERNAME = 'Demo User'
const USEREMAIL = 'demo@example.com'
const USERPASSWORD = 'demo1234'

router.post('/', function (req, res, next) {
  // console.log('User credentials:', req.body.email)

  if (req.body.email === USEREMAIL && req.body.password === USERPASSWORD) {
    req.session.username = USERNAME
    req.session.lastLogin = Date.now()
    res.redirect('/users/welcome')
  } else {
    res.redirect('/?msg=invalid_credentials')
  }
})

router.get('/welcome', function (req, res, next) {
  // console.log('Cookies: ', req.cookies)

  if (!req.session.username) {
    return res.redirect('/?msg=no_session')
  }

  res.render('users/welcome', { title: `Welcome back, ${req.cookies.username}!` })
})

router.get('/logout', function (req, res) {
  res.session.username = undefined
  res.redirect('/?msg=logged_out')
})

module.exports = router
