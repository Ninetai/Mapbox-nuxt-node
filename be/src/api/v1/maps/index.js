const express = require('express')
const router = express.Router()
const authorize = require('../../../middlewares/authorize')
const controller = require('./controller')

router.get('/', authorize(), controller.getMaps)
router.get('/templates', controller.getMapTemplates)
router.get('/:id', controller.getMap)
router.put('/:id', authorize(), controller.updateMap)
router.post('/', authorize(), controller.createMap)

module.exports = router
