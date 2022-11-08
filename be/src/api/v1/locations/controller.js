const {
  Map,
  Location
} = require('../../../models')
const formidable = require('formidable');

module.exports = {
  getLocations: async (req, res) => {
    const map = await Map.findByPk(req.query.mapId)

    try {
      const locations = await map.getLocations({
        include: {
          model: Map,
          as: 'map'
        }
      })

      res.status(200).send({
        locations
      })

    } catch (error) {
      res.status(500).send({ message: error.message })
    }
  },

  getLocation: async (req, res) => {
    try {
      const location = await Location.findByPk(req.params.id, {
        include: {
          model: Map,
          as: 'map'
        }
      })

      res.status(200).send({
        location
      })

    } catch (error) {
      res.status(500).send({ message: error.message })
    }
  },

  addLocation: async (req, res) => {
    try {
      const map = await Map.findByPk(req.body.mapId)
      const location = await map.createLocation({
        pin: req.body.pin,
        name: req.body.name,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        photo: req.body.photo,
        pdf: req.body.pdf,
        location_value: req.body.location_value,
        description: req.body.description,
        latitude: req.body.latitude,
        longitude: req.body.longitude
      })

      res.status(200).send({
        location
      })
    } catch (error) {
      res.status(500).send({ message: error.message })
    }
  },

  updateLocation: async (req, res) => {
    const location = await Location.findByPk(req.params.id)
    
    try {
      const result = await location.update({
        pin: req.body.pin || location.pin,
        name: req.body.name || location.name,
        address: req.body.address || location.address,
        city: req.body.city || location.city,
        state: req.body.state || location.state,
        photo: req.body.photo || location.photo,
        pdf: req.body.pdf || location.pdf,
        location_value: req.body.location_value || location.location_value,
        description: req.body.description || location.description,
        latitude: req.body.latitude || location.latitude,
        longitude: req.body.longitude || location.longitude
      })

      res.status(200).send({
        location: result
      })
    } catch (error) {
      res.status(500).send({ message: error.message })
    }
  }
}