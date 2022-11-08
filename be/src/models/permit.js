'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Permit extends Model {
    static associate(models) {
      Permit.belongsToMany(models.Plan, {
        as: 'plans',
        through: 'plan_permits',
        foreignKey: 'permit_id'
      })
    }
  }

  Permit.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    timestamps: false,
    modelName: 'Permit',
    tableName: 'permits'
  });
  return Permit;
};