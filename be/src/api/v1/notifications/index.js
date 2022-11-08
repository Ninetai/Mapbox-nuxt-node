const express = require('express')
const router = express.Router()
const authorize = require('../../../middlewares/authorize')
const controller = require('./controller')

router.get('/', authorize(), controller.getNotifications)

module.exports = router
