const {
  Notification,
  User
} = require('../../../models')

module.exports = {
  getNotifications: async (req, res) => {
    const user = req.user

    try {
      const notifications = await user.getNotifications()

      res.status(200).send({
        notifications
      })

    } catch (error) {
      res.status(500).send({ message: error.message })
    }
  }
}