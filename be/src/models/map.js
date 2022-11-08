'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Map extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Map.belongsTo(models.User, {
        as: 'user',
        foreignKey: 'user_id'
      })

      Map.hasMany(models.Location, {
        as: 'locations',
        foreignKey: 'map_id'
      })
    }
  }
  Map.init({
    user_id: DataTypes.INTEGER,
    template_id: DataTypes.INTEGER,
    title: DataTypes.STRING(500),
    description: DataTypes.TEXT,
    basemap_selector: DataTypes.BOOLEAN,
    address_finder: DataTypes.BOOLEAN,
    seo_keywords: DataTypes.JSON,
    distance_ring1: DataTypes.FLOAT(10, 2),
    distance_ring2: DataTypes.FLOAT(10, 2),
    distance_ring3: DataTypes.FLOAT(10, 2),
    distance_ring1_on: DataTypes.BOOLEAN,
    distance_ring2_on: DataTypes.BOOLEAN,
    distance_ring3_on: DataTypes.BOOLEAN,
    drive_time_ring: DataTypes.BOOLEAN,
    bicycle_time_ring: DataTypes.BOOLEAN,
    working_time_ring: DataTypes.BOOLEAN,
    location_unit_name: DataTypes.STRING
  }, {
    sequelize,
    tableName: 'maps',
    modelName: 'Map',
  });

  return Map;
};