'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('userprofiles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      activation_key: {
        type: Sequelize.STRING
      },
      display_name: {
        type: Sequelize.STRING
      },
      mobile: {
        type: Sequelize.STRING
      },
      date_of_birth: {
        type: Sequelize.STRING
      },
      photo: {
        type: Sequelize.STRING
      },
      last_login: {
        type: Sequelize.DATE
      },
      location: {
        type: Sequelize.STRING
      },
      website: {
        type: Sequelize.STRING
      },
      linkedin: {
        type: Sequelize.STRING
      },
      organization_name: {
        type: Sequelize.STRING
      },
      abn: {
        type: Sequelize.STRING
      },
      address_line_1: {
        type: Sequelize.STRING
      },
      address_line_2: {
        type: Sequelize.STRING
      },
      agency_license_number: {
        type: Sequelize.STRING
      },
      country: {
        type: Sequelize.STRING
      },
      state: {
        type: Sequelize.STRING
      },
      postcode: {
        type: Sequelize.STRING
      },
      suburb: {
        type: Sequelize.STRING
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('userprofiles');
  }
};