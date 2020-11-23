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
  if (!req.session.username) {
    return res.redirect('/?msg=no_session')
  }

  const responseData = { title: `Welcome back, ${req.session.username}!` }

  if (req.query.errorMsg) {
    responseData.errorMsg = req.query.errorMsg
  }

  if (req.query.successMsg) {
    responseData.successMsg = req.query.successMsg
  }

  res.render('users/welcome', responseData)
})

router.get('/logout', function (req, res) {
  req.session.destroy()
  res.redirect('/?msg=logged_out')
})

module.exports = router
