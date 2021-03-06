import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Http, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class ExamService {

  options;
  domain = this.authService.domain;

  constructor(
    private authService: AuthService,
    private http: Http
  ) { }

  // Function to create headers, add token, to be used in HTTP requests
  createAuthenticationHeaders() {
    this.authService.loadToken(); // Get token so it can be attached to headers
    // Headers configuration options
    this.options = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json', // Format set to JSON
        'authorization': this.authService.authToken // Attach token
      })
    });
  }

  // Function to create a new exam post
  newExam(exam) {
    this.createAuthenticationHeaders(); // Create headers
    return this.http.post(this.domain + 'exams/newExam', exam, this.options).map(res => res.json());
  }


  getAllExams() {
    this.createAuthenticationHeaders(); // Create headers
    return this.http.get(this.domain + 'exams/allExams', this.options).map(res => res.json());
  }

  // Function to get the exam using the id
  getSingleExam(id) {
    this.createAuthenticationHeaders(); // Create headers
    return this.http.get(this.domain + 'exams/singleExam/' + id, this.options).map(res => res.json());
  }

  // Function to edit/update exam post
  editExam(exam) {
    this.createAuthenticationHeaders(); // Create headers
    return this.http.put(this.domain + 'exams/updateExam/', exam, this.options).map(res => res.json());
  }

  // Function to delete a exam
  deleteExam(id) {
    this.createAuthenticationHeaders(); // Create headers
    return this.http.delete(this.domain + 'exams/deleteExam/' + id, this.options).map(res => res.json());
  }

  // Function to register for the exam
  registerExam(id) {
    const examData = { id: id };
    return this.http.put(this.domain + 'exams/registerExam/', examData, this.options).map(res => res.json());
  }

}
