const Sequelize = require('sequelize');
const db = require('../db');

module.exports = db.define('layout',{
  name:{
    type: Sequelize.STRING,
    allowNull: false,
  },
  author: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

