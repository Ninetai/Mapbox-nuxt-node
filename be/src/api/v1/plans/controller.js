const {
  Plan,
  Permit
} = require('../../../models')
const { Op } = require('sequelize')

module.exports = {
  getAll: async (req, res) => {
    try {
      let plans = await Plan.findAll({
        include: {
          model: Permit,
          as: 'permits',
          through: {
            attributes: ['status']
          }
        }
      })

      res.status(200).send({
        plans
      })

    } catch (error) {
      res.status(500).send({ message: error.message })
    }
  }
}