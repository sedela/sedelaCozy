import { Component, OnInit, Injectable, Input} from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/toPromise';
import { DataService } from './appmodel.service';
import { QuillDeltaToHtmlConverter } from './quill-delta-to-html/src/QuillDeltaToHtmlConverter';


@Injectable()

@Component({
  selector: 'div[role=application]',
  templateUrl: './app.component.html',
  /**template: `

    <div id="Global">
    <!-- <div id="gauche">
       <h3>Sedela project Default editor</h3>
        <app-model [(html)]="htmls" (htmlChange)='myValueChange($event);' (deltaChange)='myDeltaChange($event);'>
        </app-model>
        <p></p>
       <button (click)="getHtmlFromDelta()"> Charger Ecrit reflexif</button>
       <button type="submit" class="btn btn-success"(click)=getDeltaOps()>Sauvegarder Ecrit réflexif</button>
    </div>-->
    <p></p>
    <div id="droite"> <app-forum ></app-forum> </div>
     </div>
          `,*/
  styles: [],
  // styleUrls: ['./app.component.css'],
  providers: [DataService]
})
/**@Component({

  providers: [DataService]
})*/

export class AppComponent implements OnInit { // implementing OnInit
  // compteur: any;
 // @Input()  post: any;
  @Input() myToken: any = 2;
  @Input() data: any = {};
  @Input() myDomain: any = 3;
  @Input() documentname: string;
  //@Output() listeDocumentChange = new EventEmitter();
  country: any;
  htmls: any = 'Rédiger ou charger votre écrit réflexif..........';
  // @Output() deltaChange = new EventEmitter();
  delta: any;
  tabpost: any;
  post: any;
  docDelta;
  listedocument: Array<any> = [];
  contactFormModalDocumentName = new FormControl('', Validators.required);
  countryForm: FormGroup;

  constructor(public dataservice: DataService, private fb: FormBuilder) {
    document.addEventListener('DOMContentLoaded', () => {
      const root = <HTMLElement>document.querySelector('[role=application]');
      const data = root.dataset
      window['cozy'].bar.init({
        appName: data.cozyAppName,
        appSlug: data.cozyAppSlug,
        iconPath: data.cozyIconPath,
        lang: data.cozyLocale,
        replaceTitleOnMobile: false
      });
    });
    const root = <HTMLElement>document.querySelector('[role=application]');
    this.data = root.dataset;
    this.myToken = this.data.cozyToken;
    this.myDomain = this.data.cozyDomain;
    // this.value = 'app';
  }
  // constructor(public http: HttpClient, ) {}
  ngOnInit(): void { // adding the lifecycle hook ngOnInit
    this.dataservice.setConnect(this.myToken, this.myDomain);
     this.countryForm = this.fb.group({
            countryControl: new FormControl('', Validators.required)
        });
     if(((this.dataservice.getAllDocs()).length)!=0)
    	 this.listedocument = this.dataservice.getAllDocs(); 
    //console.log('this.listedocument :', this.listedocument);
     this.tabpost = this.dataservice.getForum();

  }

  /**  getHTML(){
     return this.htmls;
   }*/
   
    addDocument(documents) {
     //this.listedocument =  [...this.listedocument ,documents];
     this.listedocument.push(documents); 
  }
  getHtmlFromDelta() {
    // let delta1 = this.getDeltaOps();
    // tslint:disable-next-line:prefer-const
     this.delta = this.dataservice.getDelta();
     //this.delta =  this.documentControl.value;

    let qdc = new QuillDeltaToHtmlConverter(this.delta['ops'],
      { classPrefix: 'noz' });
    this.delta = qdc;
    console.log('delta: ', this.delta);
    this.htmls = qdc.convert();
    //  this.deltaChange.emit(this.htmls);
  }

   getHtmlFromDeltaWithPram() {
   //this.country = this.countryControl.value
   console.log('deltaform: ', this.country.value);
  /**  let qdc = new QuillDeltaToHtmlConverter(this.country['ops'],
      { classPrefix: 'noz' });
    this.delta = qdc;
    console.log('delta: ', this.delta);
    this.htmls = qdc.convert();*/
  }

  getDeltaOps() {
    this.documentname = this.contactFormModalDocumentName.value;
    this.delta = this.delta;
    this.docDelta = this.dataservice.postDelta(this.delta['ops'], this.documentname);
    //this.addDocument(this.docDelta);
    console.log('this.listedocument: ', this.listedocument);
    console.log('get query from all data: ', this.dataservice.getAllDocs());
   
  }

  /**   AfficherDelta(){
         console.log("Delta: "+this.delta['ops']);
         this.deltaChange = new EventEmitter(this.delta);
     }*/


  myValueChange(event) {
    this.htmls = event.value;
  }

  myDeltaChange(event) {
    console.log('event delta:', event.value);
    this.delta = event.value;
  }

  AfficherHTML() {
    console.log('HTML: ' + this.htmls);
  }

  myPostChange(event) {
    this.post = event;
  console.log('this  event: ', event);
    console.log('this.post: ', this.post);
    this.dataservice.postForum(this.post);
  }

addNewOption() {
  setTimeout(() => {
    if(((this.dataservice.getAllDocs()).length)!=0)
    	 this.listedocument = this.dataservice.getAllDocs(); 
      else
         this.listedocument.push(this.docDelta);

      this.countryForm.controls['countryControl'].patchValue(this.listedocument)   

    }, 2000)
  }

}
