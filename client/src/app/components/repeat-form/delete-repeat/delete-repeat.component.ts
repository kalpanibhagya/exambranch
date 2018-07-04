import { Component, OnInit } from '@angular/core';
import { RepeatService } from '../../../services/repeat.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-delete-repeat',
  templateUrl: './delete-repeat.component.html',
  styleUrls: ['./delete-repeat.component.css']
})
export class DeleteRepeatComponent implements OnInit {

  message;
  messageClass;
  foundRepeat = false;
  processing = false;
  repeat;
  currentUrl;

  constructor(
    private repeatService: RepeatService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  // Function to delete repeat subjects
  deleteRepeat() {
    this.processing = true; // Disable buttons
    // Function for DELETE request
    this.repeatService.deleteRepeat(this.currentUrl.id).subscribe(data => {
      // Check if delete request worked
      if (!data.success) {
        this.messageClass = 'alert alert-danger'; // Return error bootstrap class
        this.message = data.message; // Return error message
      } else {
        this.messageClass = 'alert alert-success'; // Return bootstrap success class
        this.message = data.message; // Return success message
        // After two second timeout, route to repeat subjects page
        setTimeout(() => {
          this.router.navigate(['/repeat_form']); // Route users to repeat subjects page
        }, 2000);
      }
    });
  }

  ngOnInit() {
    this.currentUrl = this.activatedRoute.snapshot.params; // Get URL paramaters on page load
    // Function for GET request to retrieve repeat subject
    this.repeatService.getSingleRepeat(this.currentUrl.id).subscribe(data => {
      // Check if request was successfull
      if (!data.success) {
        this.messageClass = 'alert alert-danger'; // Return bootstrap error class
        this.message = data.message; // Return error message
      } else {
        // Create the repeat subject object to use in HTML
        this.repeat = {
          subject_code: data.repeat.subject_code, // Set code
          subject_name: data.repeat.subject_name, // Set name
          createdBy: data.repeat.createdBy, // Set created_by field
          createdAt: data.repeat.createdAt // Set created_at field
        }
        this.foundRepeat = true; // Displaly repeat window
      }
    });
  }

}
