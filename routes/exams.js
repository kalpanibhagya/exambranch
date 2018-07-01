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
                // Check if validation error is in the title field
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
  =============================================================== 
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
    })
  });*/




    return router;
};