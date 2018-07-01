import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-exams',
  templateUrl: './exams.component.html',
  styleUrls: ['./exams.component.css']
})
export class ExamsComponent implements OnInit {

  messageClass;
  message;
  newExam = false;
  loadingExams = false;

  constructor() { }

  newExamForm() {
    this.newExam = true;
  }

  draftComment() {

  }

  reloadExams() {
    this.loadingExams = true;
    //get all exams
    setTimeout(() => {
      this.loadingExams = false; // Release button lock after four seconds
    }, 4000);
  }

  ngOnInit() {
  }

}
