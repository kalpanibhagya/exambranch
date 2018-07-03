/* ===================
   Import Node Modules
=================== */
const mongoose = require('mongoose'); // Node Tool for MongoDB
mongoose.Promise = global.Promise; // Configure Mongoose Promises
const Schema = mongoose.Schema; // Import Schema from Mongoose


// Validate Function to check subject_code length
let codeLengthChecker = (subject_code) => {
    // Check if subject_code exists
    if (!subject_code) {
      return false; // Return error
    } else {
      // Check the length of subject_code
      if (subject_code.length < 5 || subject_code.length > 50) {
        return false; // Return error if not within proper length
      } else {
        return true; // Return as valid subject_code
      }
    }
  };
  
  // Validate Function to check if valid subject_code format
  let alphaNumericCodeChecker = (subject_code) => {
    // Check if subject_code exists
    if (!subject_code) {
      return false; // Return error
    } else {
      // Regular expression to test for a valid subject_code
      const regExp = new RegExp(/^[a-zA-Z0-9 ]+$/);
      return regExp.test(subject_code); // Return regular expression test results (true or false)
    }
  };
  
  // Array of subject_code Validators
  const codeValidators = [
    // First subject_code Validator
    {
      validator: codeLengthChecker,
      message: 'Subject code must be 7 characters'
    },
    // Second subject_code Validator
    {
      validator: alphaNumericCodeChecker,
      message: 'Subject code must be alphanumeric'
    }
  ];
  
  // Validate Function to check subject_name length
  let nameLengthChecker = (subject_name) => {
    // Check if subject_name exists
    if (!subject_name) {
      return false; // Return error
    } else {
      // Check length of subject_name
      if (subject_name.length < 5 || subject_name.length > 50) {
        return false; // Return error if does not meet length requirement
      } else {
        return true; // Return as valid subject_code
      }
    }
  };
  
  // Array of subject_code validators
  const nameValidators = [
    // First subject_code validator
    {
      validator: nameLengthChecker,
      message: 'Subject name must be more than 5 characters but no more than 50.'
    }
  ];
  
  // Repeat Model Definition
const repeatSchema = new Schema({
    subject_code: { type: String, required: true, validate: codeValidators },
    subject_name: { type: String, required: true, validate: nameValidators },
    createdBy: { type: String },
    createdAt: { type: Date, default: Date.now() },
});

// Export Module/Schema
module.exports = mongoose.model('Repeat', repeatSchema);