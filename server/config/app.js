var config = require('./config'), 
    mongoose = require('mongoose'),   
    express = require('./express');

let crypto;
try {
  crypto = require('crypto');
} catch (err) {
  console.log('crypto support is disabled!');
}

module.exports.start = function() {
  var app = express.init();
  app.listen(config.port, function() {
    console.log('App listening on port', config.port);
  });
};