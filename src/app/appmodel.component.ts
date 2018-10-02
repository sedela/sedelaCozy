import { Component, ViewChild, ViewEncapsulation, OnInit, Injectable, Input, Output, EventEmitter  } from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms';


import { QuillEditorComponent } from 'ngx-quill/src/quill-editor.component';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import Quill from 'quill';
//import { QuillModule } from 'ngx-quill';

// override p with div tag
//import Quill from 'quill';

const Parchment = Quill.import('parchment');
const Block = Parchment.query('block');

Block.tagName = 'DIV';
// or class NewBlock extends Block {}; NewBlock.tagName = 'DIV';
Quill.register(Block /* or NewBlock */, true);

 import Counter from './counter';
Quill.register('modules/counter', Counter);



// Add fonts to whitelist
const Font = Quill.import('formats/font');
// We do not add Aref Ruqaa since it is the default
Font.whitelist = ['mirza','roboto', 'aref', 'sans-serif', 'monospace', 'serif',
                   'sofia', 'slabo', 'inconsolata'
                 ];
Quill.register(Font, true);

@Component({
  selector: 'app-model',
  template: `
        <quill-editor  [(ngModel)]="html" 
        [modules]="toolbarOptions"
        [style]="{height: '400px'}"
        (onEditorCreated)="setFocus($event)"
        (onContentChanged)="logChange($event)"> 
      
      </quill-editor>
  `,
  styles: [],
  encapsulation: ViewEncapsulation.None
})


export class AppModelComponent {

 @Input() delta: any = 2;
 // htmlget: any = 2;
 deltasave: any;
  @Input() html: any = 2;
  @Output() htmlChange = new EventEmitter();
  @Output() deltaChange = new EventEmitter();
  toolbarOptions: any = {
    toolbar: [
      [{ 'font': ['sans-serif', 'monospace', 'serif'] }],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      [
        'bold',
        'italic',
        'underline',
        'strike'
      ], 
      [{ 'color': [] }, { 'background': [] }],  

    
        
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      
          
                    
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],    
      [{ 'indent': '-1'}, { 'indent': '+1' }, { 'align': [] }],          
      [{ 'direction': 'rtl' }],   
                          
      
      ['link', 'image'],
      ['clean']                                         
    ]
  } 
  
  

  isReadOnly = false;
  form: FormGroup;
  constructor(fb: FormBuilder) {
    this.form = fb.group({
      editor: ['test']
    });
  }

// @ViewChild('Quill') quills: Quill
  @ViewChild('editor') editor: QuillEditorComponent;
 
 // @ViewChild('AppComponent') appc: AppComponent

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit() {
    this.form
      .controls
      .editor
      .valueChanges
      .debounceTime(400)
      .distinctUntilChanged()
      .subscribe(data => {
        console.log('native fromControl value changes with debounce', data);
      });
     
    if(this.editor){
      this.editor
      .onContentChanged.debounceTime(400)
      .distinctUntilChanged()
      .subscribe(data => {
        console.log('view child + directly subscription', data);
      });

      //console.log('modules quill :', this.editor.modules);

      }
   
  }

  setFocus($event) {
    $event.focus();
  }

  patchValue() {
    this.form.controls['editor'].patchValue(`${this.form.controls['editor'].value} patched!`);
  }


  toggleReadOnly() {
    this.isReadOnly = !this.isReadOnly;
  }

  logChange($event: any) {
    this.deltasave = $event.editor['editor'].delta; 
    this.getDelta();
  }

  logSelection($event: any) {
    console.log($event);
  }

  getHTML() {
    this.html = this.html;
    this.htmlChange.emit({value: this.html});

}

getDelta() {
  this.delta = this.deltasave;
  this.deltaChange.emit({value: this.delta});
 }
}
