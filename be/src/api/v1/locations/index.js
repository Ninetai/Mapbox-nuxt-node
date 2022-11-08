const express = require('express')
const router = express.Router()
const authorize = require('../../../middlewares/authorize')
const controller = require('./controller')

router.get('/:id', authorize(), controller.getLocation)
router.get('/', controller.getLocations)
router.put('/:id', authorize(), controller.updateLocation)
router.post('/', authorize(), controller.addLocation)

module.exports = router
