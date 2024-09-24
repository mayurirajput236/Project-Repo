'use strict';
const bcrypt=require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash('hash123', 10); // Change to your desired password
    return queryInterface.bulkInsert('Admins', [{
      username: 'mayuri', // Change to your desired username
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Admins', null, {});
  }
};


