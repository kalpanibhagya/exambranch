const User = require('../models/user'); // Import User Model Schema
const Update = require('../models/update');
const jwt = require('jsonwebtoken'); // Compact, URL-safe means of representing claims to be transferred between two parties.
const config = require('../config/database'); // Import database configuration

module.exports = (router) => {

   /* ===============================================================
     CREATE NEW UPDATE
  =============================================================== */
  router.post('/newUpdate', (req, res) => {
    // Check if update title was provided
    if (!req.body.title) {
      res.json({ success: false, message: 'Title is required.' }); // Return error message
    } else {
      // Check if update body was provided
      if (!req.body.body) {
        res.json({ success: false, message: 'Body is required.' }); // Return error message
      } else {
        // Check if update's creator was provided
        if (!req.body.createdBy) {
          res.json({ success: false, message: 'Creator is required.' }); // Return error
        } else {
          // Create the update object for insertion into database
          const update = new Update({
            title: req.body.title, // Title field
            body: req.body.body, // Body field
            createdBy: req.body.createdBy // CreatedBy field
          });
          // Save update into database
          update.save((err) => {
            // Check if error
            if (err) {
              // Check if error is a validation error
              if (err.errors) {
                // Check if validation error is in the title field
                if (err.errors.title) {
                  res.json({ success: false, message: err.errors.title.message }); // Return error message
                } else {
                  // Check if validation error is in the body field
                  if (err.errors.body) {
                    res.json({ success: false, message: err.errors.body.message }); // Return error message
                  } else {
                    res.json({ success: false, message: err }); // Return general error message
                  }
                }
              } else {
                res.json({ success: false, message: err }); // Return general error message
              }
            } else {
              res.json({ success: true, message: 'Update saved!' }); // Return success message
            }
          });
        }
      }
    }
  });

  /* ===============================================================
     GET ALL UPDATES
  =============================================================== */
  router.get('/allUpdates', (req, res) => {
    // Search database for all update posts
    Update.find({}, (err, updates) => {
      // Check if error was found or not
      if (err) {
        res.json({ success: false, message: err }); // Return error message
      } else {
        // Check if updates were found in database
        if (!updates) {
          res.json({ success: false, message: 'No updates found.' }); // Return error of no updates found
        } else {
          res.json({ success: true, updates: updates }); // Return success and updates array
        }
      }
    }).sort({ '_id': -1 }); // Sort updates from newest to oldest
  });

  return router;
};
