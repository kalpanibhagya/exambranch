import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-undergraduate-profile',
  templateUrl: './undergraduate-profile.component.html',
  styleUrls: ['./undergraduate-profile.component.css']
})
export class UndergraduateProfileComponent implements OnInit {

  username = '';
  email = '';

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    // Once component loads, get user's data to display on profile
    this.authService.getProfile().subscribe(profile => {
      this.username = profile.user.username; // Set username
      this.email = profile.user.email; // Set e-mail
    });

  }

}
