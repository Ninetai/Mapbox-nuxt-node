'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserProfile extends Model {
    static associate(models) {
    }
  }
  UserProfile.init({
    user_id: DataTypes.INTEGER,
    activation_key: DataTypes.STRING,
    display_name: DataTypes.STRING,
    mobile: DataTypes.STRING,
    date_of_birth: DataTypes.STRING,
    photo: DataTypes.STRING,
    last_login: DataTypes.DATE,
    location: DataTypes.STRING,
    website: DataTypes.STRING,
    linkedin: DataTypes.STRING,
    organization_name: DataTypes.STRING,
    abn: DataTypes.STRING,
    address_line_1: DataTypes.STRING,
    address_line_2: DataTypes.STRING,
    agency_license_number: DataTypes.STRING,
    country: DataTypes.STRING,
    state: DataTypes.STRING,
    postcode: DataTypes.STRING,
    suburb: DataTypes.STRING
  }, {
    sequelize,
    timestamps: false,
    tableName: 'userprofiles',
    modelName: 'UserProfile',
  });
  return UserProfile;
};