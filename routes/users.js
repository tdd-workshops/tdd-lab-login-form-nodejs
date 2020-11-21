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
    // If the user's password is too short, pass a message when we redirect to the welcome page
    if (req.body.password.length < 10) {
      res.redirect('/users/welcome?msg=password_too_short')
    } else {
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

  // If this page was passed a message, change it into text for the user
  const warningMsg = req.query.msg === 'password_too_short'
    ? 'Your password is too short, please change it to protect your account'
    : undefined

  res.render('users/welcome', {
    title: `Welcome back, ${req.cookies.username}!`,
    warningMsg: warningMsg
  })
})

router.get('/logout', function (req, res) {
  res.session.username = undefined
  res.redirect('/?msg=logged_out')
})

module.exports = router
