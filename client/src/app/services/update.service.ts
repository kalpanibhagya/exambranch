import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Http, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class UpdateService {

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

  // Function to create a new update post
  newUpdate(update) {
    this.createAuthenticationHeaders(); // Create headers
    return this.http.post(this.domain + 'updates/newUpdate', update, this.options).map(res => res.json());
  }


  // Function to get the update using the id
  getSingleUpdate(id) {
    this.createAuthenticationHeaders(); // Create headers
    return this.http.get(this.domain + 'updates/singleUpdate/' + id, this.options).map(res => res.json());
  }

  // Function to edit/update update post
  editUpdate(update) {
    this.createAuthenticationHeaders(); // Create headers
    return this.http.put(this.domain + 'updates/updateUpdate/', update, this.options).map(res => res.json());
  }

  // Function to delete a update
  deleteUpdate(id) {
    this.createAuthenticationHeaders(); // Create headers
    return this.http.delete(this.domain + 'updates/deleteUpdate/' + id, this.options).map(res => res.json());
  }


  getAllUpdates() {
    this.createAuthenticationHeaders(); // Create headers
    return this.http.get(this.domain + 'updates/allUpdates', this.options).map(res => res.json());
  }
}
