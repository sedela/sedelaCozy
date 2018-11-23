import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import { DataService } from './appmodel.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export class PostForums { 
  post_id: any;
  date: any;
  description: any;
} 

@Component({
  selector: 'app-forum',
  templateUrl: './appforum.component.html' ,
  styleUrls: ['./appforum.component.css'],
  providers: [DataService, PostForums]
  // templateUrl: './appforum.component.html',
 // styleUrls: ['./appforum.component.css']
})

// tslint:disable-next-line:component-class-suffix

export class AppForumComponent  {

  panelOpenState: boolean = false;
  listPosts  = [
    {date: new Date(), value: 'post-1', viewValue: 'Argumenter le raport'},
    {date: new Date(), value: 'post-2', viewValue: 'Texte trop court'},
    
  ];
  @Output() postChange = new EventEmitter<PostForums>();
  
  @Input() postsforum: any //= new PostForums();

     contactFormModalSubject = new FormControl('', Validators.required);
     contactFormModalMessage = new FormControl('', Validators.required);
   addPost() {
    console.log('contactFormModalSubject: ', this.contactFormModalSubject.value );
    console.log(' contactFormModalMessage: ', this.contactFormModalMessage.value);
    this.postsforum.post_id = this.contactFormModalSubject.value;
    this.postsforum.description = this.contactFormModalMessage.value;
    this.postsforum.date = new Date();
    this.postChange.emit(this.postsforum);
  }
 
}
