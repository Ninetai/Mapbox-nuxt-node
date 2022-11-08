const express = require('express')
const router = express.Router()
const passport = require('passport')

const auth = require('./auth')
const users = require('./users')
const notifications = require('./notifications')
const plans = require('./plans')
const maps = require('./maps')
const locations = require('./locations')

/*
|---------------------------------------------------------------------
| Public API - Version being used
|---------------------------------------------------------------------
*/
router.get('/', (req, res) => {
  res.send({
    version: '1.0.0'
  })
})

router.use('/auth', auth)
router.use('/users', users)
router.use('/notifications', notifications)
router.use('/plans', plans)
router.use('/maps', maps)
router.use('/locations', locations)

module.exports = router
