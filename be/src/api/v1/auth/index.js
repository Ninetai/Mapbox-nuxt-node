const express = require('express')
const passport = require('passport')
const router = express.Router()
const authorize = require('../../../middlewares/authorize')
const controller = require('./controller')

router.post('/login', controller.signin)
router.post('/register', controller.signup)
router.post('/reset-password', authorize(), controller.resetPassword)
router.get('/me', authorize(), controller.getMe)
router.get('/logout', authorize(), controller.logout)

module.exports = router
