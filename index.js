var express = require('express');
var mongoose = require('mongoose')
var routes = require('./router')


var app = express();

var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

const config = { 
  mongoURL: process.env.MONGO_URL || 'mongodb://localhost:27017/sheesh',
}

mongoose.connect(config.mongoURL, { useNewUrlParser: true }, (error) => {
  if (error) {
    console.error('Please make sure Mongodb is installed and running!'); // eslint-disable-line no-console
    throw error;
  }
});

app.use(bodyParser.json({extended: true, limit: "50mb"}));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" })); // for parsing application/x-www-form-urlencoded
app.use(methodOverride());
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Lesson API v1.0')
})

app.use('/api', routes);

var portNum = 3002;
app.listen(portNum, function () {
    console.log('Api started at port:', portNum);
});


