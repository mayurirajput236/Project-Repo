const { DataTypes } = require('sequelize');
const sequelize = require('../config/database.js');
const Admin=require('../models/adminModel.js')
const Users = sequelize.define('user', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdBy: {
    type: DataTypes.INTEGER, // Assuming admin IDs are integers
    allowNull: false,
    references: {
        model: 'Admins', // Assuming you have an 'admins' table
        key: 'id',
    },
  }
});
Admin.hasOne(Users, {
  foreignKey: 'createdBy',
});
Users.belongsTo(Admin, {
  foreignKey: 'createdBy',
});
module.exports = Users;
