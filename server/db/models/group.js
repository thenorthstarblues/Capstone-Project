const Sequelize = require('sequelize');
const db = require('../db');

const group = db.define('group', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = group;