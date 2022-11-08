'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('maps', {
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
      template_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'map_templates',
          key: 'id'
        }
      },
      title: {
        type: Sequelize.STRING(500),
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT
      },
      basemap_selector: {
        type: Sequelize.BOOLEAN,
        default: false
      },
      address_finder: {
        type: Sequelize.BOOLEAN,
        default: false
      },
      seo_keywords: {
        type: Sequelize.JSON
      },
      distance_ring1: {
        type: Sequelize.FLOAT(10, 2)
      },
      distance_ring2: {
        type: Sequelize.FLOAT(10, 2)
      },
      distance_ring3: {
        type: Sequelize.FLOAT(10, 2)
      },
      distance_ring1_on: {
        type: Sequelize.BOOLEAN
      },
      distance_ring2_on: {
        type: Sequelize.BOOLEAN
      },
      distance_ring3_on: {
        type: Sequelize.BOOLEAN
      },
      drive_time_ring: {
        type: Sequelize.BOOLEAN,
        default: false
      },
      bicycle_time_ring: {
        type: Sequelize.BOOLEAN,
        default: false
      },
      working_time_ring: {
        type: Sequelize.BOOLEAN,
        default: false
      },
      location_unit_name: {
        type: Sequelize.STRING,
        required: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('maps');
  }
};