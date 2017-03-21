const db = require('./db');
const chalk = require('chalk');

require('./models/saveFile');

var syncedDb = db.sync();

syncedDb.then(function () {
  console.log(chalk.green('Sequelize models synced to PostgreSQL'));
});

module.exports = syncedDb;
