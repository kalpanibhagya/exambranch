import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Http, Headers, RequestOptions } from '@angular/http';


@Injectable()
export class RepeatService {

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

  // Function to create a new repeat post
  newRepeat(repeat) {
    this.createAuthenticationHeaders(); // Create headers
    return this.http.post(this.domain + 'repeats/newRepeat', repeat, this.options).map(res => res.json());
  }


  getAllRepeats() {
    this.createAuthenticationHeaders(); // Create headers
    return this.http.get(this.domain + 'repeats/allRepeats', this.options).map(res => res.json());
  }

  // Function to get the repeat using the id
  getSingleRepeat(id) {
    this.createAuthenticationHeaders(); // Create headers
    return this.http.get(this.domain + 'repeats/singleRepeat/' + id, this.options).map(res => res.json());
  }

  // Function to edit/update repeat post
  editRepeat(repeat) {
    this.createAuthenticationHeaders(); // Create headers
    return this.http.put(this.domain + 'repeats/updateRepeat/', repeat, this.options).map(res => res.json());
  }

  // Function to delete a repeat
  deleteRepeat(id) {
    this.createAuthenticationHeaders(); // Create headers
    return this.http.delete(this.domain + 'repeats/deleteRepeat/' + id, this.options).map(res => res.json());
  }


}
