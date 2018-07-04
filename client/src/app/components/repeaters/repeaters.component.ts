import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { RepeatService } from '../../services/repeat.service';
import * as jsPDF from 'jspdf';


@Component({
  selector: 'app-repeaters',
  templateUrl: './repeaters.component.html',
  styleUrls: ['./repeaters.component.css']
})
export class RepeatersComponent implements OnInit {

  @ViewChild('content') content: ElementRef;

  repeats;
  
    constructor(
      //private formBuilder: FormBuilder,
      private authService: AuthService,
      private repeatService: RepeatService
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
  
      doc.save('repeaters.pdf');
    }
    
    getAllRepeats() {
      // Function to GET all blogs from database
      this.repeatService.getAllRepeats().subscribe(data => {
        this.repeats = data.repeats; // Assign array to use in HTML
      });
    }
  
    ngOnInit() {
      // Get profile username on page load
      //this.authService.getProfile().subscribe(profile => {
        //this.username = profile.user.username; // Used when creating new exam posts and comments
      //});
  
      this.getAllRepeats();
  
    }

}
