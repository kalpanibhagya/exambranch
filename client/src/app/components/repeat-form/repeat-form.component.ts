import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { RepeatService } from '../../services/repeat.service';

@Component({
  selector: 'app-repeat-form',
  templateUrl: './repeat-form.component.html',
  styleUrls: ['./repeat-form.component.css']
})
export class RepeatFormComponent implements OnInit {

  messageClass;
  message;
  newPost = false;
  form;
  processing=false;
  username;
  repeats;
  
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private repeatService: RepeatService

  ) {
    this.createNewForm();
   }

  createNewForm() {
    this.form = this.formBuilder.group({
      subject_code: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(5),
        this.alphaNumericValidation
      ])],
      subject_name: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(5)
      ])]
    })
  }

  // Enable new repeat form
  enableFormNewForm() {
    this.form.get('subject_code').enable(); // Enable subject_code field
    this.form.get('subject_name').enable(); // Enable subject_name field
  }

  // Disable new repeat form
  disableFormNewForm() {
    this.form.get('subject_code').disable(); // Disable subject_code field
    this.form.get('subject_name').disable(); // Disable subject_name field
  }

  alphaNumericValidation(controls) {
    const regExp = new RegExp(/^[a-zA-Z0-9 ]+$/); // Regular expression to perform test
    // Check if test returns false or true
    if (regExp.test(controls.value)) {
      return null; // Return valid
    } else {
      return { 'alphaNumericValidation': true } // Return error in validation
    }
  }

  newForm() {
    this.newPost = true;
  }

  onSubmit() {
    //console.log('form submitted');
    this.processing = true; // Disable submit button
    this.disableFormNewForm(); // Lock form
    // Create repeat object from form fields
    const repeat = {
      subject_code: this.form.get('subject_code').value, // subject_code field
      subject_name: this.form.get('subject_name').value, // subject_name field
      createdBy: this.username // CreatedBy field
    }

    // Function to save repeat into database
  this.repeatService.newRepeat(repeat).subscribe(data => {
    // Check if repeat was saved to database or not
    if (!data.success) {
      this.messageClass = 'alert alert-danger'; // Return error class
      this.message = data.message; // Return error message
      this.processing = false; // Enable submit button
      this.enableFormNewForm(); // Enable form
    } else {
      this.messageClass = 'alert alert-success'; // Return success class
      this.message = data.message; // Return success message
      this.getAllRepeats();
      // Clear form data after two seconds
      setTimeout(() => {
        this.newPost = false; // Hide form
        this.processing = false; // Enable submit button
        this.message = false; // Erase error/success message
        this.form.reset(); // Reset all form fields
        this.enableFormNewForm(); // Enable the form fields
      }, 2000);
    }
  });
  }

  goBack() {
    window.location.reload(); // Clear all variable states
  }

  getAllRepeats() {
    // Function to GET all repeats from database
    this.repeatService.getAllRepeats().subscribe(data => {
      this.repeats = data.repeats; // Assign array to use in HTML
    });
  }

  ngOnInit() {

    // Get profile username on page load
    this.authService.getProfile().subscribe(profile => {
      this.username = profile.user.username; // Used when creating new posts
    });

    this.getAllRepeats();
  }

}
