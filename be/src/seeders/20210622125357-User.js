'use strict'

const faker = require('faker')
const bcrypt = require('bcryptjs')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const admin = {
      id: 1,
      email: 'admin@admin.com',
      username: 'Admin',
      password: bcrypt.hashSync('password'),
      createdAt: new Date(),
      updatedAt: new Date()
    }
    const user = {
      id: 2,
      email: 'olehmota@gmail.com',
      username: 'olehmota',
      password: bcrypt.hashSync('password'),
      createdAt: new Date(),
      updatedAt: new Date()
    }

    // const users = [...Array(100)].map((user) => {
    //   return {
    //     email: faker.internet.email(),
    //     username: faker.internet.userName(),
    //     password: bcrypt.hashSync('password'),
    //     roleId: 2,
    //     createdAt: new Date(),
    //     updatedAt: new Date()
    //   }
    // })

    const userroles = [{
      id: 1,
      user_id: 1,
      role_id: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 2,
      user_id: 2,
      role_id: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }]

    const userProfiles = [{
      id: 1,
      user_id: 1
    }, {
      id: 2,
      user_id: 2
    }]

    await queryInterface.bulkInsert('users', [admin, user], {})
    await queryInterface.bulkInsert('userrole', userroles, {})
    await queryInterface.bulkInsert('userprofiles', userProfiles, {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('userprofiles', null, {})
    await queryInterface.bulkDelete('userrole', null, {})
    await queryInterface.bulkDelete('users', null, {})
  }
}