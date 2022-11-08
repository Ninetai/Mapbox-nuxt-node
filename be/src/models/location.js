'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Location extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Location.belongsTo(models.Map, {
        as: 'map',
        foreignKey: 'map_id'
      })
    }
  }
  Location.init({
    map_id: DataTypes.INTEGER,
    pin: DataTypes.STRING,
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    photo: DataTypes.STRING,
    pdf: DataTypes.STRING,
    location_value: DataTypes.FLOAT,
    description: DataTypes.TEXT,
    latitude: DataTypes.FLOAT(11, 8),
    longitude: DataTypes.FLOAT(11, 8)
  }, {
    sequelize,
    tableName: 'locations',
    timestamps: false,
    modelName: 'Location',
  });
  return Location;
};