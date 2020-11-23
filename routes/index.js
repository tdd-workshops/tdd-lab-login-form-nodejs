const express = require('express')
const router = express.Router()

/* GET home page. */
router.get('/', function (req, res, next) {
  const responseData = { title: 'Login Demo' }

  if (req.query.errorMsg) {
    responseData.errorMsg = req.query.errorMsg
  }

  if (req.query.successMsg) {
    responseData.successMsg = req.query.successMsg
  }

  res.render('index', responseData)
})

module.exports = router
