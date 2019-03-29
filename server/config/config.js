//This file holds any configuration variables we may need 
//'config.js' is typically ignored by git to protect sensitive information, such as your database's username and password

//Updated to production project
module.exports = {
  db: {
    uri: 'mongodb://patriel:pa$$lTb2016@ds347665.mlab.com:47665/mentorship', //place the URI of your mongo database here.
  }, 
  port: process.env.PORT || 8080
};