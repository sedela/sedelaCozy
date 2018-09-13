import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { DataService } from './appmodel.service';


/**export class PostForums {
    name: string;
    topic: any;
    date_post: any;
    constructor(name: string, topic: any) {
      this.name = name;
      this.topic = topic;
      this.date_poste = new Date ();
    }
} */

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

  rForm: FormGroup;
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
 /** addPost(post) {
    this.description = post.description;
    this.name = post.name;
    this.date_post = new Date();
    this.postsforum = {object_post: post.name, topics: post.description, date_post: new Date()};
    this.postChange.emit({value: this.postsforum});
  }*/

}
