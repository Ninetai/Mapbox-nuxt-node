'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PlanPermit extends Model {
    static associate(models) {
    }
  }
  PlanPermit.init({
    plan_id: DataTypes.INTEGER,
    permit_id: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'PlanPermit',
    tableName: 'plan_permits'
  });
  return PlanPermit;
};