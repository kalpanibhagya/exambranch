import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
//import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  @ViewChild('content') content: ElementRef;

  //messageClass;
  //message;
  //newPost = false;
  //form;
  //processing=false;
  //username;
  users;

  constructor(
    //private formBuilder: FormBuilder,
    private authService: AuthService,
    private userService: UserService
  ) { 
    //this.createNewForm();
  }

  

  downloadPDF() {
    let doc = new jsPDF;
    let specialElementHandlers = {
      '#editor' : function(element, renderer) {
          return true;
      }
    };

    let content =  this.content.nativeElement;

    doc.fromHTML(content.innerHTML , 15, 15, {
        'width' : 190,
        'elementHandlers' : specialElementHandlers
    });

    doc.save('students.pdf');
  }

  getAllUsers() {
    // Function to GET all blogs from database
    this.userService.getAllUsers().subscribe(data => {
      this.users = data.users; // Assign array to use in HTML
    });
  }



  ngOnInit() {
    // Get profile username on page load
    //this.authService.getProfile().subscribe(profile => {
      //this.username = profile.user.username; // Used when creating new exam posts and comments
    //});

    this.getAllUsers();

  }

}
