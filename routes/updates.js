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


  /* ===============================================================
     GET SINGLE Update
  =============================================================== */
  router.get('/singleUpdate/:id', (req, res) => {
    // Check if id is present in parameters
    if (!req.params.id) {
      res.json({ success: false, message: 'No update ID was provided.' }); // Return error message
    } else {
      // Check if the update id is found in database
      Update.findOne({ _id: req.params.id }, (err, update) => {
        // Check if the id is a valid ID
        if (err) {
          res.json({ success: false, message: 'Not a valid update id' }); // Return error message
        } else {
          // Check if update was found by id
          if (!update) {
            res.json({ success: false, message: 'Update not found.' }); // Return error message
          } else {
            // Find the current user that is logged in
            User.findOne({ _id: req.decoded.userId }, (err, user) => {
              // Check if error was found
              if (err) {
                res.json({ success: false, message: err }); // Return error
              } else {
                // Check if username was found in database
                if (!user) {
                  res.json({ success: false, message: 'Unable to authenticate user' }); // Return error message
                } else {
                  // Check if the user who requested single update is the one who created it
                  if (user.username !== update.createdBy) {
                    res.json({ success: false, message: 'You are not authorized to eidt this update.' }); // Return authentication reror
                  } else {
                    res.json({ success: true, update: update }); // Return success
                  }
                }
              }
            });
          }
        }
      });
    }
  });

  /* ===============================================================
     UPDATE Update POST
  =============================================================== */
  router.put('/updateUpdate', (req, res) => {
    // Check if id was provided
    if (!req.body._id) {
      res.json({ success: false, message: 'No update id provided' }); // Return error message
    } else {
      // Check if id exists in database
      Update.findOne({ _id: req.body._id }, (err, update) => {
        // Check if id is a valid ID
        if (err) {
          res.json({ success: false, message: 'Not a valid update id' }); // Return error message
        } else {
          // Check if id was found in the database
          if (!update) {
            res.json({ success: false, message: 'Update id was not found.' }); // Return error message
          } else {
            // Check who user is that is requesting update update
            User.findOne({ _id: req.decoded.userId }, (err, user) => {
              // Check if error was found
              if (err) {
                res.json({ success: false, message: err }); // Return error message
              } else {
                // Check if user was found in the database
                if (!user) {
                  res.json({ success: false, message: 'Unable to authenticate user.' }); // Return error message
                } else {
                  // Check if user logged in the the one requesting to update update post
                  if (user.username !== update.createdBy) {
                    res.json({ success: false, message: 'You are not authorized to edit this update post.' }); // Return error message
                  } else {
                    update.title = req.body.title; // Save latest update title
                    update.body = req.body.body; // Save latest update body
                    update.save((err) => {
                      if (err) {
                        if (err.errors) {
                          res.json({ success: false, message: 'Please ensure form is filled out properly' });
                        } else {
                          res.json({ success: false, message: err }); // Return error message
                        }
                      } else {
                        res.json({ success: true, message: 'Update Changed Successfully!' }); // Return success message
                      }
                    });
                  }
                }
              }
            });
          }
        }
      });
    }
  });

  /* ===============================================================
     DELETE UPDATE POST
  =============================================================== */
  router.delete('/deleteUpdate/:id', (req, res) => {
    // Check if ID was provided in parameters
    if (!req.params.id) {
      res.json({ success: false, message: 'No id provided' }); // Return error message
    } else {
      // Check if id is found in database
      Update.findOne({ _id: req.params.id }, (err, update) => {
        // Check if error was found
        if (err) {
          res.json({ success: false, message: 'Invalid id' }); // Return error message
        } else {
          // Check if update was found in database
          if (!update) {
            res.json({ success: false, messasge: 'Update was not found' }); // Return error message
          } else {
            // Get info on user who is attempting to delete post
            User.findOne({ _id: req.decoded.userId }, (err, user) => {
              // Check if error was found
              if (err) {
                res.json({ success: false, message: err }); // Return error message
              } else {
                // Check if user's id was found in database
                if (!user) {
                  res.json({ success: false, message: 'Unable to authenticate user.' }); // Return error message
                } else {
                  // Check if user attempting to delete update is the same user who originally posted the update
                  if (user.username !== update.createdBy) {
                    res.json({ success: false, message: 'You are not authorized to delete this update' }); // Return error message
                  } else {
                    // Remove the update from database
                    update.remove((err) => {
                      if (err) {
                        res.json({ success: false, message: err }); // Return error message
                      } else {
                        res.json({ success: true, message: 'Update deleted!' }); // Return success message
                      }
                    });
                  }
                }
              }
            });
          }
        }
      });
    }
  });


  return router;
};
