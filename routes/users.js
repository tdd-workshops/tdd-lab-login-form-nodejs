const express = require('express')
const router = express.Router()

const USERNAME = 'Demo User'
const USEREMAIL = 'demo@example.com'
const USERPASSWORD = 'demo1234'
const USERPASSWORD2 = 'betterPassword3!Q5'

router.post('/', function (req, res, next) {
  // console.log('User credentials:', req.body.email)

  // For this exercise, we will allow either password to log in
  if (req.body.email === USEREMAIL && (req.body.password === USERPASSWORD || req.body.password === USERPASSWORD2)) {
    req.session.username = USERNAME
    req.session.lastLogin = Date.now()

    if (req.body.password.length < 10) {
      // If the user's password is too short, render the welcome page, but show a warning
      res.render('users/welcome', {
        title: 'Security Alert',
        warningMsg: 'Your password is too short, please change it to protect your account'
      })
    } else {
      // Otherwise redirect to the welcome page as before
      res.redirect('/users/welcome')
    }
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
