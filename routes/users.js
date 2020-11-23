const express = require('express')
const router = express.Router()

const users = require('../db/users')

router.post('/', function (req, res, next) {
  const user = users.findOne({ email: req.body.email })

  if (user && user.password === req.body.password) {
    req.session.username = user.username
    req.session.lastLogin = Date.now()
    res.redirect('/users/welcome?successMsg=Successfully,+logged+in!')
  } else {
    res.redirect('/?errorMsg=Invalid+user+login.')
  }
})

router.get('/welcome', function (req, res, next) {
  if (!req.session.username) {
    return res.redirect('/?errorMsg=Please+login+to+begin.')
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
  res.redirect('/?successMsg=You+have+successfully+logged+out.')
})

module.exports = router
