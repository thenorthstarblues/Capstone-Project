const Sequelize = require('sequelize');
const db = require('../db');


module.exports = db.define('save',{
  name:{
    type: Sequelize.STRING,
    allowNull:false
  },
  data: {
    type: Sequelize.TEXT,
    allowNull: false
  }
},{})

