const express = require('express')
const router = express.Router()

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.render('users/welcome', { title: 'Welcome back!' })
})

module.exports = router
