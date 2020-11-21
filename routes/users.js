const express = require('express')
const router = express.Router()

const USERNAME = 'Demo User'
const USEREMAIL = 'demo@example.com'
const USERPASSWORD = 'g00dpass99^%&'

router.post('/', function (req, res, next) {
  // console.log('User credentials:', req.body.email)

  const { email, password } = req.body

  if (password) {
    if (password.length < 10) {
      return res.redirect('/?errorMsg=' + encodeURIComponent('Password must be at least 10 characters'))
    }
    if (!password.match(/[0123456789]/)) {
      return res.redirect('/?errorMsg=' + encodeURIComponent('Password must contain a number'))
    }
    // If you choose to include '-' then be sure to escape it as '\-'
    if (!password.match(/[@#$%^&*()=+[\]{}/\\?.,><';":!]/)) {
      return res.redirect('/?errorMsg=' + encodeURIComponent('Password must contain a symbol'))
    }
  }

  if (email === USEREMAIL && password === USERPASSWORD) {
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
