import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { UpdateService } from '../../../services/update.service';

@Component({
  selector: 'app-edit-update',
  templateUrl: './edit-update.component.html',
  styleUrls: ['./edit-update.component.css']
})
export class EditUpdateComponent implements OnInit {

  message;
  messageClass;
  update;
  processing = false;
  currentUrl;
  loading = true;

  constructor(
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private updateService: UpdateService,
    private router: Router
  ) { }

  // Function to Submit Update
  updateUpdateSubmit() {
    this.processing = true; // Lock form fields
    // Function to send update object to backend
    this.updateService.editUpdate(this.update).subscribe(data => {
      // Check if PUT request was a success or not
      if (!data.success) {
        this.messageClass = 'alert alert-danger'; // Set error bootstrap class
        this.message = data.message; // Set error message
        this.processing = false; // Unlock form fields
      } else {
        this.messageClass = 'alert alert-success'; // Set success bootstrap class
        this.message = data.message; // Set success message
        // After two seconds, navigate back to update page
        setTimeout(() => {
          this.router.navigate(['/updates']); // Navigate back to route page
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
    // Function to GET current update with id in params
    this.updateService.getSingleUpdate(this.currentUrl.id).subscribe(data => {
      // Check if GET request was success or not
      if (!data.success) {
        this.messageClass = 'alert alert-danger'; // Set bootstrap error class
        this.message = 'Update not found.'; // Set error message
      } else {
        this.update = data.update; // Save update object for use in HTML
        this.loading = false; // Allow loading of update form
      }
    });

  }

}
