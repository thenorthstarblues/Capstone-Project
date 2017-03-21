const Sequelize = require('sequelize');
const db = require('../db');

module.exports = db.define('element',{
  height: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  width: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  children: {
    type: Sequelize.STRING,
  },
  layId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  x: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  y: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  parent: {
    type: Sequelize.INTEGER
  },
  tag: {
    type: Sequelize.STRING,
    allowNull: false
  },
  css: {
    type: Sequelize.STRING
  }
  
})