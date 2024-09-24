const { DataTypes } = require('sequelize');
const sequelize = require('../config/database.js');
const Users=require('../models/userModel.js')
const Products = sequelize.define('product', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  },
  desc: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
        model: Users,
        key: 'id'
    },
    allowNull: false,
},
});
Users.hasOne(Products, {
    foreignKey: 'userId',
});
Products.belongsTo(Users, {
    foreignKey: 'userId',
});
module.exports = Products;