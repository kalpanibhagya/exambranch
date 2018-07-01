import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ExamService } from '../../services/exam.service';

@Component({
  selector: 'app-exams',
  templateUrl: './exams.component.html',
  styleUrls: ['./exams.component.css']
})
export class ExamsComponent implements OnInit {

  messageClass;
  message;
  newPost = false;
  loadingExams = false;
  form;
  processing=false;
  username;
  exams;
  
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private examService: ExamService

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

  // Enable new exam form
  enableFormNewForm() {
    this.form.get('subject_code').enable(); // Enable subject_code field
    this.form.get('subject_name').enable(); // Enable subject_name field
  }

  // Disable new exam form
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

  newExamForm() {
    this.newPost = true;
  }

  reloadExams() {
    this.loadingExams = true;
    this.getAllExams();
    setTimeout(() => {
      this.loadingExams = false; // Release button lock after four seconds
    }, 4000);
  }

  onSubmit() {
    //console.log('form submitted');
    this.processing = true; // Disable submit button
    this.disableFormNewForm(); // Lock form
    // Create exam object from form fields
    const exam = {
      subject_code: this.form.get('subject_code').value, // subject_code field
      subject_name: this.form.get('subject_name').value, // subject_name field
      createdBy: this.username // CreatedBy field
    }

    // Function to save exam into database
  this.examService.newExam(exam).subscribe(data => {
    // Check if exam was saved to database or not
    if (!data.success) {
      this.messageClass = 'alert alert-danger'; // Return error class
      this.message = data.message; // Return error message
      this.processing = false; // Enable submit button
      this.enableFormNewForm(); // Enable form
    } else {
      this.messageClass = 'alert alert-success'; // Return success class
      this.message = data.message; // Return success message
      this.getAllExams();
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

  getAllExams() {
    // Function to GET all blogs from database
    this.examService.getAllExams().subscribe(data => {
      this.exams = data.exams; // Assign array to use in HTML
    });
  }


  ngOnInit() {

    // Get profile username on page load
    this.authService.getProfile().subscribe(profile => {
      this.username = profile.user.username; // Used when creating new exam posts and comments
    });

    this.getAllExams();
  }

}
