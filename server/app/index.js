'use strict';
var path = require('path');
var express = require('express');
var app = express();
var morgan = require('morgan');
module.exports = app;

require('./configure')(app);

//app.use('/api', require('./routes'));


 app.use(morgan('dev'))
 app.use(express.static(path.resolve(__dirname, '..', 'public')))
 app.get('/', function (req, res){
   res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
 })



app.use(function (req, res, next) {

    if (path.extname(req.path).length > 0) {
        res.status(404).end();
    } else {
        next(null);
    }

});

app.get('/', function (req, res) {
    res.sendFile(app.get('indexHTMLPath'));
});


app.use(function (err, req, res, next) {
    console.error(err, typeof next);
    console.error(err.stack)
    res.status(err.status || 500).send(err.message || 'Internal server error.');
});
