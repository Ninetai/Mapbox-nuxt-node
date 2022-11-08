const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const passport = require('passport')
const { User, Role } = require('../../../models')
const { secret } = require('../../../config/auth')
const validator = require('validator')

module.exports = {
  signin: async (req, res) => {
    if (!validator.isEmail(req.body.email)) {
      res.status(500).send({ message: 'Invalid email format' })
    }

    try {
      const user = await User.findOne({
        where: {
          email: req.body.email
        },
        include: [{
          model: Role,
          as: 'roles'
        }]
      })

      if (!user) {
        res.status(404).send({
          message: 'User not found.'
        })
      }

      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      )

      if (!passwordIsValid) {
        res.status(401).send({
          message: 'Password is incorrect.'
        })
      }

      const token = jwt.sign({ id: user.id }, secret, {
        expiresIn: 86400 // 24 hours
      })

      res.status(200).send({
        token,
        user
      })
    } catch (error) {
      res.status(500).send({ message: error.message })
    }
  },

  signup: async (req, res) => {
    const user = await User.findOne({
      where: {
        email: req.body.email
      }
    })

    if (user) {
      res.status(400).send({ message: 'This user already exists.' })
    }

    try {
      const user = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
      })

      try {
        const role = await user.addRole([2])

        const token = jwt.sign({ id: user.id }, secret, {
          expiresIn: 86400 // 24 hours
        })

        const u = await User.findOne({
          where: {
            email: user.email
          },
          include: [{
            model: Role,
            as: 'roles'
          }]
        })

        res.status(200).send({
          token,
          user: u
        })
      } catch (err) {
        res.status(500).send(err.message)
      }
    } catch(err) {
      res.status(500).send(err.errors[0])
    }
  },

  getMe: async (req, res) => {
    res.status(200).send({ user: req.user })
  },

  logout: async (req, res) => {
    req.logout()

    res.status(200).send({
      message: 'Successfully logged out'
    })
  },

  resetPassword: async (req, res) => {
    const user = req.user
    const result = bcrypt.compareSync(req.body.originalPassword, user.password)

    if (result) {
      try {
        await user.update({
          password: req.body.newPassword
        })
        
        res.status(200).send({
          message: 'Successfully updated.'
        })
      } catch (err) {
        res.status(500).send({ message: err.message })
      }
    } else {
      res.status(500).send({
        message: 'Original password is not correct.'
      })
    }
  }
}