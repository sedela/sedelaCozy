import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { DataService } from './appmodel.service';



@Component({
  selector: 'app-forum',
  templateUrl: './appforum.component.html' ,
  styleUrls: ['./appforum.component.scss'],
  providers: [DataService]
  // templateUrl: './appforum.component.html',
 // styleUrls: ['./appforum.component.css']
})

// tslint:disable-next-line:component-class-suffix



export class AppForumComponent {

  //rForm: FormGroup;
  @Input() post: any; // A property for our submitted form
  @Output() postChange = new EventEmitter();
  description = '';
  name = '';
  titleAlert = 'This field is required';
  date_post: any;
  postsforum: any;

  // tslint:disable-next-line:use-life-cycle-interface
   //contactFormModalName = new FormControl('', Validators.required);
   // contactFormModalEmail = new FormControl('', Validators.email);
     contactFormModalSubject = new FormControl('', Validators.required);
     contactFormModalMessage = new FormControl('', Validators.required);
   constructor(public dataservice: DataService,) {}
    
   addPost() {
    //this.description = post.description;
    //this.name = post.name;
   console.log('contactFormModalSubject: ',this.contactFormModalSubject.value );
   console.log(' contactFormModalMessage: ',this.contactFormModalMessage.value);
    this.date_post = new Date();
    this.postsforum = {subject: this.contactFormModalSubject.value, comment: this.contactFormModalMessage.value , date_post: new Date()};
  this.dataservice.postForum(this.postsforum );
    
    //this.postChange.emit({value: this.postsforum});
  //this.postChange.emit({value: this.description});
   //console.log('contactFormModalSubject: ',this.contactFormModalSubject.value );
   //console.log(' contactFormModalMessage: ',this.contactFormModalMessage.value);
  }

}
