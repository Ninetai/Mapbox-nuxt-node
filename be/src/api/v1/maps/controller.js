const {
  Map,
  MapTemplate
} = require('../../../models')

module.exports = {
  getMaps: async (req, res) => {
    const user = req.user

    try {
      const maps = await user.getMaps()

      res.status(200).send({
        maps
      })

    } catch (error) {
      res.status(500).send({ message: error.message })
    }
  },
  getMap: async (req, res) => {
    try {
      const map = await Map.findByPk(req.params.id)

      res.status(200).send({
        map
      })

    } catch (error) {
      res.status(500).send({ message: error.message })
    }
  },
  updateMap: async (req, res) => {
    try {
      const map = await Map.findByPk(req.params.id)

      const result = await map.update({
        template_id: req.body.template_id,
        title: req.body.title,
        url: req.body.url,
        description: req.body.description,
        seo_keywords: req.body.seo_keywords,
        drive_time_ring: req.body.drive_time_ring,
        bicycle_time_ring: req.body.bicycle_time_ring,
        working_time_ring: req.body.working_time_ring,
        distance_ring1: req.body.distance_ring1,
        distance_ring1_on: req.body.distance_ring1_on,
        distance_ring2: req.body.distance_ring2,
        distance_ring2_on: req.body.distance_ring2_on,
        distance_ring3: req.body.distance_ring3,
        distance_ring3_on: req.body.distance_ring3_on,
        address_finder: req.body.address_finder,
        basemap_selector: req.body.basemap_selector,
        location_unit_name: req.body.location_unit_name
      })

      res.status(200).send({
        result
      })
    } catch (error) {
      res.status(500).send({ message: error.message })
    }
  },
  getMapTemplates: async (req, res) => {
    try {
      const templates = await MapTemplate.findAll()

      res.status(200).send({
        templates
      })
    } catch (error) {
      res.status(500).send({ message: error.message })
    }
  },
  createMap: async (req, res) => {
    const user = req.user
    
    try {
      const map = await user.createMap({
        template_id: req.body.template_id,
        title: req.body.title,
        url: req.body.url,
        description: req.body.description,
        seo_keywords: req.body.seo_keywords,
        drive_time_ring: req.body.drive_time_ring,
        bicycle_time_ring: req.body.bicycle_time_ring,
        working_time_ring: req.body.working_time_ring,
        distance_ring1: req.body.distance_ring1,
        distance_ring1_on: req.body.distance_ring1_on,
        distance_ring2: req.body.distance_ring2,
        distance_ring2_on: req.body.distance_ring2_on,
        distance_ring3: req.body.distance_ring3,
        distance_ring3_on: req.body.distance_ring3_on,
        address_finder: req.body.address_finder,
        basemap_selector: req.body.basemap_selector,
        location_unit_name: req.body.location_unit_name
      })

      res.status(200).send({
        map
      })

    } catch (error) {
      res.status(500).send({ message: error.message })
    }
  }
}