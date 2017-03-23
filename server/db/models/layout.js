const Sequelize = require('sequelize');
const DataTypes = require('sequelize').DataTypes;
const db = require('../db');

module.exports = db.define('layout',{
  name:{
    type: Sequelize.STRING,
    allowNull: false,
  },
  author: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  groupId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'groups',
      key: 'id'
    }
  }
})

