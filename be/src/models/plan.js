'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Plan extends Model {
    static associate(models) {
      Plan.belongsToMany(models.Permit, {
        as: 'permits',
        through: 'plan_permits',
        foreignKey: 'plan_id'
      })
    }
  }
  
  Plan.init({
    name: DataTypes.STRING,
    price: DataTypes.FLOAT,
    description: DataTypes.STRING,
    recommended: DataTypes.BOOLEAN
  }, {
    sequelize,
    timestamps: false,
    modelName: 'Plan',
    tableName: 'plans'
  })

  return Plan
};