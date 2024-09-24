// models/Admin.js
// models/Admin.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database.js'); // Adjust the path as necessary

class Admin extends Model {}

Admin.init({
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'Admin',
});

module.exports = Admin;
