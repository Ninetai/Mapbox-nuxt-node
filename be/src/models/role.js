'use strict'
const {
  Model
} = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    static associate(models) {
      Role.belongsToMany(models.User, {
        as: 'users',
        through: 'userrole',
        foreignKey: 'role_id'
      })
    }
  }

  Role.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    timestamps: false,
    tableName: 'roles',
    modelName: 'Role'
  })
  
  return Role
}