import { Component, OnInit } from '@angular/core';
import { UpdateService } from '../../../services/update.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-delete-update',
  templateUrl: './delete-update.component.html',
  styleUrls: ['./delete-update.component.css']
})
export class DeleteUpdateComponent implements OnInit {

  message;
  messageClass;
  foundUpdate = false;
  processing = false;
  update;
  currentUrl;

  constructor(
    private updateService: UpdateService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  // Function to delete update
  deleteUpdate() {
    this.processing = true; // Disable buttons
    // Function for DELETE request
    this.updateService.deleteUpdate(this.currentUrl.id).subscribe(data => {
      // Check if delete request worked
      if (!data.success) {
        this.messageClass = 'alert alert-danger'; // Return error bootstrap class
        this.message = data.message; // Return error message
      } else {
        this.messageClass = 'alert alert-success'; // Return bootstrap success class
        this.message = data.message; // Return success message
        // After two second timeout, route to update page
        setTimeout(() => {
          this.router.navigate(['/updates']); // Route users to update page
        }, 2000);
      }
    });
  }

  ngOnInit() {
    this.currentUrl = this.activatedRoute.snapshot.params; // Get URL paramaters on page load
    // Function for GET request to retrieve update
    this.updateService.getSingleUpdate(this.currentUrl.id).subscribe(data => {
      // Check if request was successfull
      if (!data.success) {
        this.messageClass = 'alert alert-danger'; // Return bootstrap error class
        this.message = data.message; // Return error message
      } else {
        // Create the update object to use in HTML
        this.update = {
          title: data.update.title, // Set title
          body: data.update.body, // Set body
          createdBy: data.update.createdBy, // Set created_by field
          createdAt: data.update.createdAt // Set created_at field
        }
        this.foundUpdate = true; // Displaly update window
      }
    });
  }


}
