'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MapTemplate extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  MapTemplate.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    tableName: 'map_templates',
    timestamps: false,
    modelName: 'MapTemplate',
  });
  return MapTemplate;
};