const User = require('../models/user'); // Import User Model Schema
const jwt = require('jsonwebtoken'); // Compact, URL-safe means of representing claims to be transferred between two parties.
const config = require('../config/database'); // Import database configuration

module.exports = (router) => {

   

  /* ===============================================================
     GET ALL USERS
  =============================================================== */
  router.get('/allUsers', (req, res) => {
    // Search database for all user posts
    User.find({}, (err, users) => {
      // Check if error was found or not
      if (err) {
        res.json({ success: false, message: err }); // Return error message
      } else {
        // Check if Users were found in database
        if (!users) {
          res.json({ success: false, message: 'No users found.' }); // Return error of no users found
        } else {
          res.json({ success: true, users: users }); // Return success and users array
        }
      }
    })
  });

  return router;
};
