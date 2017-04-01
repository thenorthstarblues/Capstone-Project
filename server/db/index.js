const db = require('./db');
const chalk = require('chalk');

require('./models');



var syncedDb = db.sync();
//var syncedDb = db.sync({force:true});

syncedDb.then(function () {
  console.log(chalk.green('Sequelize models synced to PostgreSQL'));
});

module.exports = syncedDb;
