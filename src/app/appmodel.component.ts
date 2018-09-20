import { Component, ElementRef, ViewChild, ViewEncapsulation, OnInit, Injectable, Input, Output, EventEmitter  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { QuillEditorComponent } from 'ngx-quill/src/quill-editor.component';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';


// override p with div tag
import Quill from 'quill';

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
Font.whitelist = ['mirza', 'aref', 'sans-serif', 'monospace', 'serif'];
Quill.register(Font, true);

import { QuillDeltaToHtmlConverter } from './quill-delta-to-html/src/QuillDeltaToHtmlConverter';
import { DataService } from './appmodel.service';
import { HttpClient } from '@angular/common/http';
// import { AppComponent } from './app-delta-html.component';

@Component({
  selector: 'app-model',
  template: `
        <quill-editor  [(ngModel)]="html" [style]="{height: '400px'}" (onEditorCreated)="setFocus($event)"
           (onContentChanged)="logChange($event)"> </quill-editor>
  `,

  styles: [`
    quill-editor {
      display: block;
    }
    .ng-invalid {
      border: 1px dashed red;
    }

    /* Set default font-family */
    [quill-editor-element] {
      font-family: "Roboto";
    }

    /* Set dropdown font-families */
    [quill-editor-toolbar] .ql-font span[data-label="Aref Ruqaa"]::before {
      font-family: "Aref Ruqaa";
    }
    [quill-editor-toolbar] .ql-font span[data-label="Mirza"]::before {
      font-family: "Mirza";
    }
    [quill-editor-toolbar] .ql-font span[data-label="Roboto"]::before {
      font-family: "Roboto";
    }

    /* Set content font-families */
    .ql-font-mirza {
      font-family: "Mirza";
    }
    .ql-font-aref {
      font-family: "Aref Ruqaa";
    }
    /* We do not set Aref Ruqaa since it is the default font */
  `],
 // providers: [DataService],
  encapsulation: ViewEncapsulation.None
})


export class AppModelComponent {

 @Input() delta: any = 2;
 // htmlget: any = 2;
 deltasave: any;
  @Input() html: any = 2;
  @Output() htmlChange = new EventEmitter();
  @Output() deltaChange = new EventEmitter();

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

    this.editor
      .onContentChanged.debounceTime(400)
      .distinctUntilChanged()
      .subscribe(data => {
        console.log('view child + directly subscription', data);
      });

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
    // this.deltasave = $event['delta']['ops'];
    this.deltasave = $event['delta'];
    this.getDelta();
    // console.log($event['delta']['ops']);
    console.log('this.deltasave:',this.deltasave)
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
console.log('this.delta:',this.delta);
  this.deltaChange.emit({value: this.delta});

}
}
