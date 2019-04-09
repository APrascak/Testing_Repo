//This file holds any configuration variables we may need
//'config.js' is typically ignored by git to protect sensitive information, such as your database's username and password

//Updated to production project
module.exports = {
  db: {
    uri: 'mongodb://user1234:user1234@ds347665.mlab.com:47665/mentorship', //place the URI of your mongo database here.
  },
  google: {
    clientID: '689535721540-aug77u2qm88apfnvq7puitdhukg1hef8.apps.googleusercontent.com',
    clientSecret: 'fJfQOpL9H673c02xnslskffk'
  },
  session: {
    cookieKey: 'user1234'
  },
  port: process.env.PORT || 8080
};
