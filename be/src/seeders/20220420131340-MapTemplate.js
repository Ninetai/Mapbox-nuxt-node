'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('map_templates', [{
      id: 1,
      name: 'Template 1'
    }, {
      id: 2,
      name: 'Template 2'
    }, {
      id: 3,
      name: 'Template 3'
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('map_templates', null, {});
  }
};
