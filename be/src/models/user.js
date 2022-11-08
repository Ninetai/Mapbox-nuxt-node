'use strict'
const {
  Model
} = require('sequelize')
const bcrypt = require('bcryptjs')

function encryptPasswordIfChanged(user, options) {
  if (user.password) {
    user.password = bcrypt.hashSync(user.password, 8)
  }
}

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.belongsToMany(models.Role, {
        as: 'roles',
        through: 'userrole',
        foreignKey: 'user_id'
      })

      User.hasMany(models.Map, {
        as: 'maps',
        foreignKey: 'user_id'
      })
    }
  }

  User.init({
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: {
          msg: 'Email field is required.'
        },
        isEmail: {
          msg: 'Invalid email format.'
        }
      }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: {
          args: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/i,
          msg: 'Password should contain at least one number and one special character'
        }
      }
    }
  }, {
    hooks: {
      beforeCreate: encryptPasswordIfChanged,
      beforeUpdate: encryptPasswordIfChanged
    },
    sequelize,
    tableName: 'users',
    modelName: 'User'
  })

  return User
}