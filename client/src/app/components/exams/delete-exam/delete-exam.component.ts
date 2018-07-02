import { Component, OnInit } from '@angular/core';
import { ExamService } from '../../../services/exam.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-delete-exam',
  templateUrl: './delete-exam.component.html',
  styleUrls: ['./delete-exam.component.css']
})
export class DeleteExamComponent implements OnInit {

  message;
  messageClass;
  foundExam = false;
  processing = false;
  exam;
  currentUrl;

  constructor(
    private examService: ExamService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  // Function to delete exams
  deleteExam() {
    this.processing = true; // Disable buttons
    // Function for DELETE request
    this.examService.deleteExam(this.currentUrl.id).subscribe(data => {
      // Check if delete request worked
      if (!data.success) {
        this.messageClass = 'alert alert-danger'; // Return error bootstrap class
        this.message = data.message; // Return error message
      } else {
        this.messageClass = 'alert alert-success'; // Return bootstrap success class
        this.message = data.message; // Return success message
        // After two second timeout, route to exam page
        setTimeout(() => {
          this.router.navigate(['/exams']); // Route users to exam page
        }, 2000);
      }
    });
  }

  ngOnInit() {
    this.currentUrl = this.activatedRoute.snapshot.params; // Get URL paramaters on page load
    // Function for GET request to retrieve exam
    this.examService.getSingleExam(this.currentUrl.id).subscribe(data => {
      // Check if request was successfull
      if (!data.success) {
        this.messageClass = 'alert alert-danger'; // Return bootstrap error class
        this.message = data.message; // Return error message
      } else {
        // Create the exam object to use in HTML
        this.exam = {
          subject_code: data.exam.subject_code, // Set code
          subject_name: data.exam.subject_name, // Set name
          createdBy: data.exam.createdBy, // Set created_by field
          createdAt: data.exam.createdAt // Set created_at field
        }
        this.foundExam = true; // Displaly exam window
      }
    });
  }

}
