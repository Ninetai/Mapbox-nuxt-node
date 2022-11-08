'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('locations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      map_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'maps',
          key: 'id'
        }
      },
      pin: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      address: {
        type: Sequelize.STRING
      },
      city: {
        type: Sequelize.STRING
      },
      state: {
        type: Sequelize.STRING
      },
      photo: {
        type: Sequelize.STRING
      },
      pdf: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      location_value: {
        required: true,
        type: Sequelize.FLOAT
      },
      latitude: {
        type: Sequelize.FLOAT(11, 8)
      },
      longitude: {
        type: Sequelize.FLOAT(11, 8)
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('locations');
  }
};