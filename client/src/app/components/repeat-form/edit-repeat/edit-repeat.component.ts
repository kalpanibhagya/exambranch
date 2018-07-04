import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { RepeatService } from '../../../services/repeat.service';

@Component({
  selector: 'app-edit-repeat',
  templateUrl: './edit-repeat.component.html',
  styleUrls: ['./edit-repeat.component.css']
})
export class EditRepeatComponent implements OnInit {

  message;
  messageClass;
  repeat;
  processing = false;
  currentUrl;
  loading = true;

  constructor(
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private repeatService: RepeatService,
    private router: Router
  ) { }

  // Function to Submit Update
  updateRepeatSubmit() {
    this.processing = true; // Lock form fields
    // Function to send repeat object to backend
    this.repeatService.editRepeat(this.repeat).subscribe(data => {
      // Check if PUT request was a success or not
      if (!data.success) {
        this.messageClass = 'alert alert-danger'; // Set error bootstrap class
        this.message = data.message; // Set error message
        this.processing = false; // Unlock form fields
      } else {
        this.messageClass = 'alert alert-success'; // Set success bootstrap class
        this.message = data.message; // Set success message
        // After two seconds, navigate back to repeat page
        setTimeout(() => {
          this.router.navigate(['/repeat_form']); // Navigate back to route page
        }, 2000);
      }
    });
  }

  // Function to go back to previous page
  goBack() {
    this.location.back();
  }

  ngOnInit() {
    this.currentUrl = this.activatedRoute.snapshot.params; // When component loads, grab the id
    // Function to GET current repeat with id in params
    this.repeatService.getSingleRepeat(this.currentUrl.id).subscribe(data => {
      // Check if GET request was success or not
      if (!data.success) {
        this.messageClass = 'alert alert-danger'; // Set bootstrap error class
        this.message = 'Repeat subject not found.'; // Set error message
      } else {
        this.repeat = data.repeat; // Save repeat object for use in HTML
        this.loading = false; // Allow loading of repeat  form
      }
    });
  }
}
