import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { DataService } from './appmodel.service';

export class PostForums {
  subject: any;
  comment: any;
  date_post: any;
} 

@Component({
  selector: 'app-forum',
  templateUrl: './appforum.component.html' ,
  styleUrls: ['./appforum.component.scss'],
  providers: [DataService, PostForums]
  // templateUrl: './appforum.component.html',
 // styleUrls: ['./appforum.component.css']
})

// tslint:disable-next-line:component-class-suffix

export class AppForumComponent {

  //rForm: FormGroup;
  //@Input() post: any; // A property for our submitted form
  @Output() postChange = new EventEmitter<PostForums>();
  postsforum = new PostForums();

 
  // tslint:disable-next-line:use-life-cycle-interface
   //contactFormModalName = new FormControl('', Validators.required);
   // contactFormModalEmail = new FormControl('', Validators.email);
     contactFormModalSubject = new FormControl('', Validators.required);
     contactFormModalMessage = new FormControl('', Validators.required);
   //constructor(public dataservice: DataService,) {}
    
   addPost() {
    console.log('contactFormModalSubject: ',this.contactFormModalSubject.value );
   console.log(' contactFormModalMessage: ',this.contactFormModalMessage.value);
    this.postsforum.subject = this.contactFormModalSubject.value;
    this.postsforum.comment= this.contactFormModalMessage.value;
    this.postsforum.date_post = new Date();
    this.postChange.emit(this.postsforum);
  }

}
