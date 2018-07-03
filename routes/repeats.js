const User = require('../models/user'); // Import User Model Schema
const Repeat = require('../models/repeat');
const jwt = require('jsonwebtoken'); // Compact, URL-safe means of representing claims to be transferred between two parties.
const config = require('../config/database'); // Import database configuration

module.exports = (router) => {

    /* ===============================================================
     CREATE NEW REPEAT
  =============================================================== */
  router.post('/newRepeat', (req, res) => {
    // Check if subject_code was provided
    if (!req.body.subject_code) {
      res.json({ success: false, message: 'Subject code is required.' }); // Return error message
    } else {
      // Check if subject_name was provided
      if (!req.body.subject_name) {
        res.json({ success: false, message: 'Subject name is required.' }); // Return error message
      } else {
        // Check if creator was provided
        if (!req.body.createdBy) {
          res.json({ success: false, message: 'Creator is required.' }); // Return error
        } else {
          // Create the repeat object for insertion into database
          const repeat = new Repeat({
            subject_code: req.body.subject_code, // subject_code field
            subject_name: req.body.subject_name, // subject_name field
            createdBy: req.body.createdBy // CreatedBy field
          });
          // Save repeat into database
          repeat.save((err) => {
            // Check if error
            if (err) {
              // Check if error is a validation error
              if (err.errors) {
                // Check if validation error is in the subject code field
                if (err.errors.subject_code) {
                  res.json({ success: false, message: err.errors.subject_code.message }); // Return error message
                } else {
                  // Check if validation error is in the subject_name field
                  if (err.errors.subject_name) {
                    res.json({ success: false, message: err.errors.subject_name.message }); // Return error message
                  } else {
                    res.json({ success: false, message: err }); // Return general error message
                  }
                }
              } else {
                res.json({ success: false, message: err }); // Return general error message
              }
            } else {
              res.json({ success: true, message: 'Repeat Subject Saved!' }); // Return success message
            }
          });
        }
      }
    }
  });

  /* ===============================================================
     GET ALL REPEATS
  =============================================================== */
  router.get('/allRepeats', (req, res) => {
    // Search database for all repeat posts
    Repeat.find({}, (err, repeats) => {
      // Check if error was found or not
      if (err) {
        res.json({ success: false, message: err }); // Return error message
      } else {
        // Check if repeats were found in database
        if (!repeats) {
          res.json({ success: false, message: 'No repeats found.' }); // Return error of no repeats found
        } else {
          res.json({ success: true, repeats: repeats }); // Return success and repeats array
        }
      }
    }).sort({ '_id': -1 }); // Sort repeats from newest to oldest
  });

    /* ===============================================================
     GET SINGLE repeat
  =============================================================== 
  router.get('/singleRepeat/:id', (req, res) => {
    // Check if id is present in parameters
    if (!req.params.id) {
      res.json({ success: false, message: 'No repeat ID was provided.' }); // Return error message
    } else {
      // Check if the repeat id is found in database
      Repeat.findOne({ _id: req.params.id }, (err, repeat) => {
        // Check if the id is a valid ID
        if (err) {
          res.json({ success: false, message: 'Not a valid repeat id' }); // Return error message
        } else {
          // Check if repeat was found by id
          if (!repeat) {
            res.json({ success: false, message: 'Repeat not found.' }); // Return error message
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
                  // Check if the user who requested single repeat is the one who created it
                  if (user.username !== repeat.createdBy) {
                    res.json({ success: false, message: 'You are not authorized to eidt this repeat.' }); // Return authentication reror
                  } else {
                    res.json({ success: true, repeat: repeat }); // Return success
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
     UPDATE repeat POST
  =============================================================== 
  router.put('/updateRepeat', (req, res) => {
    // Check if id was provided
    if (!req.body._id) {
      res.json({ success: false, message: 'No repeat id provided' }); // Return error message
    } else {
      // Check if id exists in database
      Repeat.findOne({ _id: req.body._id }, (err, repeat) => {
        // Check if id is a valid ID
        if (err) {
          res.json({ success: false, message: 'Not a valid repeat id' }); // Return error message
        } else {
          // Check if id was found in the database
          if (!repeat) {
            res.json({ success: false, message: 'Repeat id was not found.' }); // Return error message
          } else {
            // Check who user is that is requesting repeat update
            User.findOne({ _id: req.decoded.userId }, (err, user) => {
              // Check if error was found
              if (err) {
                res.json({ success: false, message: err }); // Return error message
              } else {
                // Check if user was found in the database
                if (!user) {
                  res.json({ success: false, message: 'Unable to authenticate user.' }); // Return error message
                } else {
                  // Check if user logged in the the one requesting to update repeat post
                  if (user.username !== repeat.createdBy) {
                    res.json({ success: false, message: 'You are not authorized to edit this repeat post.' }); // Return error message
                  } else {
                    repeat.subject_code = req.body.subject_code; // Save latest repeat subject code
                    repeat.subject_name = req.body.subject_name; // Save latest repeat subject name
                    repeat.save((err) => {
                      if (err) {
                        if (err.errors) {
                          res.json({ success: false, message: 'Please ensure form is filled out properly' });
                        } else {
                          res.json({ success: false, message: err }); // Return error message
                        }
                      } else {
                        res.json({ success: true, message: 'Repeat Subject Updated!' }); // Return success message
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
*/
    /* ===============================================================
     DELETE Repeat POST
  =============================================================== 
  router.delete('/deleteRepeat/:id', (req, res) => {
    // Check if ID was provided in parameters
    if (!req.params.id) {
      res.json({ success: false, message: 'No id provided' }); // Return error message
    } else {
      // Check if id is found in database
      Repeat.findOne({ _id: req.params.id }, (err, repeat) => {
        // Check if error was found
        if (err) {
          res.json({ success: false, message: 'Invalid id' }); // Return error message
        } else {
          // Check if repeat was found in database
          if (!repeat) {
            res.json({ success: false, messasge: 'Repeat was not found' }); // Return error message
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
                  // Check if user attempting to delete repeat is the same user who originally posted the repeat
                  if (user.username !== repeat.createdBy) {
                    res.json({ success: false, message: 'You are not authorized to delete this repeat' }); // Return error message
                  } else {
                    // Remove the repeat from database
                    repeat.remove((err) => {
                      if (err) {
                        res.json({ success: false, message: err }); // Return error message
                      } else {
                        res.json({ success: true, message: 'Repeat Subject Deleted!' }); // Return success message
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
*/
    
    return router;
};