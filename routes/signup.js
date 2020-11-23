const express = require('express')
const router = express.Router()

const users = require('../db/users')

router.get('/', function (req, res, next) {
  if (req.session.username) {
    return res.redirect('/users/welcome')
  }

  res.render('signup', { username: '', email: '' })
})

router.post('/', function (req, res, next) {
  let isValid = true
  let errorMessage = ''

  if (req.body.username.length === 0 ||
    req.body.email.length === 0 ||
    req.body.password.length === 0
  ) {
    isValid = false
    errorMessage += 'Please fill up the required form fields. '
    return res.render('signup', { errorMsg: errorMessage, username: req.body.username, email: req.body.email })
  }

  const existingUsername = users.findOne({ username: req.body.username })
  if (existingUsername) {
    isValid = false
    errorMessage += 'Username has already been taken. '
  }

  const existingEmail = users.findOne({ email: req.body.email })
  if (existingEmail) {
    isValid = false
    errorMessage += 'Email has already been taken. '
  }

  if (req.body.password !== req.body.password_confirm) {
    isValid = false
    errorMessage += 'Passwords do not match. '
  }

  if (!isValid) {
    res.render('signup', { errorMsg: errorMessage, username: req.body.username, email: req.body.email })
  } else {
    users.insert({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email
    })

    req.session.username = req.body.username
    req.session.lastLogin = Date.now()
    res.redirect('/users/welcome?successMsg=Thank+you+for+signing+up')
  }
})

module.exports = router
