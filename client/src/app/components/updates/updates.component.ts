import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { UpdateService } from '../../services/update.service';

@Component({
  selector: 'app-updates',
  templateUrl: './updates.component.html',
  styleUrls: ['./updates.component.css']
})
export class UpdatesComponent implements OnInit {

  messageClass;
  message;
  newPost = false;
  loadingBlogs = false;
  form;
  processing=false;
  username;
  updates;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private updateService: UpdateService
  ) { 
    this.createNewForm();
  }

  createNewForm() {
    this.form = this.formBuilder.group({
      title: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(5),
        this.alphaNumericValidation
      ])],
      body: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(500),
        Validators.minLength(5)
      ])]
    })
  }

  // Enable new update form
  enableFormNewForm() {
    this.form.get('title').enable(); // Enable title field
    this.form.get('body').enable(); // Enable body field
  }

  // Disable new update form
  disableFormNewForm() {
    this.form.get('title').disable(); // Disable title field
    this.form.get('body').disable(); // Disable body field
  }

  // Validation for title
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

  // Reload blogs on current page
  reloadBlogs() {
    this.loadingBlogs = true; // Used to lock button
    this.getAllUpdates(); // Add any new blogs to the page
    setTimeout(() => {
      this.loadingBlogs = false; // Release button lock after four seconds
    }, 4000);
  }

  draftComment() {

  }

  onSubmit() {
    //console.log('form submitted');
    this.processing = true; // Disable submit button
    this.disableFormNewForm(); // Lock form
    // Create update object from form fields
    const update = {
      title: this.form.get('title').value, // Title field
      body: this.form.get('body').value, // Body field
      createdBy: this.username // CreatedBy field
    }

    // Function to save update into database
  this.updateService.newUpdate(update).subscribe(data => {
    // Check if update was saved to database or not
    if (!data.success) {
      this.messageClass = 'alert alert-danger'; // Return error class
      this.message = data.message; // Return error message
      this.processing = false; // Enable submit button
      this.enableFormNewForm(); // Enable form
    } else {
      this.messageClass = 'alert alert-success'; // Return success class
      this.message = data.message; // Return success message
      this.getAllUpdates();
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

  getAllUpdates() {
    // Function to GET all blogs from database
    this.updateService.getAllUpdates().subscribe(data => {
      this.updates = data.updates; // Assign array to use in HTML
    });
  }

  ngOnInit() {
    // Get profile username on page load
    this.authService.getProfile().subscribe(profile => {
      this.username = profile.user.username; // Used when creating new update posts and comments
    });

    this.getAllUpdates();
  }

}
