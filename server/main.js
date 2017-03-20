
// var chalk = require('chalk');
// var startDb = require('./db');
// var server = require('http').createServer();

// var createApplication = function () {
//     var app = require('./app');
//     server.on('request', app);
// };

// var startServer = function () {

//     var PORT = process.env.PORT || 3000;

//     server.listen(PORT, function () {
//         console.log(chalk.blue('Server started on port', chalk.magenta(PORT)));
//     });

// };

// startDb
// .then(createApplication)
// .then(startServer)
// .catch(function (err) {
//     console.error(chalk.red(err.stack));
//     process.exit(1);
// });

const express = require('express')
const path = require('path')
const port = process.env.PORT || 3000
const app = express()
const morgan = require('morgan')

app.use(morgan('dev'))
app.use(express.static(path.resolve(__dirname, '..', 'public')))
app.get('/', function (req, res){
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})

app.listen(port)
console.log("listening on port " + port)
// //  const path = require('path')
// //  const port = process.env.PORT || 3000
//  const app = express()
//  const morgan = require('morgan')

 app.use(morgan('dev'))
 app.use(express.static(path.resolve(__dirname, '..', 'public')))
 app.get('/', function (req, res){
   res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
 })

 app.listen(port)
 console.log("listening on port " + port)