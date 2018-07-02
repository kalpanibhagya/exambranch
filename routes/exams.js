const User = require('../models/user'); // Import User Model Schema
const Exam = require('../models/exam');
const jwt = require('jsonwebtoken'); // Compact, URL-safe means of representing claims to be transferred between two parties.
const config = require('../config/database'); // Import database configuration

module.exports = (router) => {

    /* ===============================================================
     CREATE NEW EXAM
  =============================================================== */
  router.post('/newExam', (req, res) => {
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
          // Create the exam object for insertion into database
          const exam = new Exam({
            subject_code: req.body.subject_code, // subject_code field
            subject_name: req.body.subject_name, // subject_name field
            createdBy: req.body.createdBy // CreatedBy field
          });
          // Save exam into database
          exam.save((err) => {
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
              res.json({ success: true, message: 'Exam saved!' }); // Return success message
            }
          });
        }
      }
    }
  });

  /* ===============================================================
     GET ALL EXAMS
  =============================================================== */
  router.get('/allExams', (req, res) => {
    // Search database for all exam posts
    Exam.find({}, (err, exams) => {
      // Check if error was found or not
      if (err) {
        res.json({ success: false, message: err }); // Return error message
      } else {
        // Check if exams were found in database
        if (!exams) {
          res.json({ success: false, message: 'No exams found.' }); // Return error of no exams found
        } else {
          res.json({ success: true, exams: exams }); // Return success and exams array
        }
      }
    }).sort({ '_id': -1 }); // Sort exams from newest to oldest
  });

    /* ===============================================================
     GET SINGLE EXAM
  =============================================================== */
  router.get('/singleExam/:id', (req, res) => {
    // Check if id is present in parameters
    if (!req.params.id) {
      res.json({ success: false, message: 'No exam ID was provided.' }); // Return error message
    } else {
      // Check if the exam id is found in database
      Exam.findOne({ _id: req.params.id }, (err, exam) => {
        // Check if the id is a valid ID
        if (err) {
          res.json({ success: false, message: 'Not a valid exam id' }); // Return error message
        } else {
          // Check if exam was found by id
          if (!exam) {
            res.json({ success: false, message: 'Exam not found.' }); // Return error message
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
                  // Check if the user who requested single exam is the one who created it
                  if (user.username !== exam.createdBy) {
                    res.json({ success: false, message: 'You are not authorized to eidt this exam.' }); // Return authentication reror
                  } else {
                    res.json({ success: true, exam: exam }); // Return success
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
     UPDATE EXAM POST
  =============================================================== */
  router.put('/updateExam', (req, res) => {
    // Check if id was provided
    if (!req.body._id) {
      res.json({ success: false, message: 'No exam id provided' }); // Return error message
    } else {
      // Check if id exists in database
      Exam.findOne({ _id: req.body._id }, (err, exam) => {
        // Check if id is a valid ID
        if (err) {
          res.json({ success: false, message: 'Not a valid exam id' }); // Return error message
        } else {
          // Check if id was found in the database
          if (!exam) {
            res.json({ success: false, message: 'Exam id was not found.' }); // Return error message
          } else {
            // Check who user is that is requesting exam update
            User.findOne({ _id: req.decoded.userId }, (err, user) => {
              // Check if error was found
              if (err) {
                res.json({ success: false, message: err }); // Return error message
              } else {
                // Check if user was found in the database
                if (!user) {
                  res.json({ success: false, message: 'Unable to authenticate user.' }); // Return error message
                } else {
                  // Check if user logged in the the one requesting to update exam post
                  if (user.username !== exam.createdBy) {
                    res.json({ success: false, message: 'You are not authorized to edit this exam post.' }); // Return error message
                  } else {
                    exam.subject_code = req.body.subject_code; // Save latest exam subject code
                    exam.subject_name = req.body.subject_name; // Save latest exam subject name
                    exam.save((err) => {
                      if (err) {
                        if (err.errors) {
                          res.json({ success: false, message: 'Please ensure form is filled out properly' });
                        } else {
                          res.json({ success: false, message: err }); // Return error message
                        }
                      } else {
                        res.json({ success: true, message: 'Exam Updated!' }); // Return success message
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
     DELETE EXAM POST
  =============================================================== */
  router.delete('/deleteExam/:id', (req, res) => {
    // Check if ID was provided in parameters
    if (!req.params.id) {
      res.json({ success: false, message: 'No id provided' }); // Return error message
    } else {
      // Check if id is found in database
      Exam.findOne({ _id: req.params.id }, (err, exam) => {
        // Check if error was found
        if (err) {
          res.json({ success: false, message: 'Invalid id' }); // Return error message
        } else {
          // Check if exam was found in database
          if (!exam) {
            res.json({ success: false, messasge: 'Exam was not found' }); // Return error message
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
                  // Check if user attempting to delete exam is the same user who originally posted the exam
                  if (user.username !== exam.createdBy) {
                    res.json({ success: false, message: 'You are not authorized to delete this exam' }); // Return error message
                  } else {
                    // Remove the exam from database
                    exam.remove((err) => {
                      if (err) {
                        res.json({ success: false, message: err }); // Return error message
                      } else {
                        res.json({ success: true, message: 'Exam deleted!' }); // Return success message
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