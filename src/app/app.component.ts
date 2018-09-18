import { Component, OnInit, Injectable, Input, ElementRef } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
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

  //test mat-select
  countries: any = [
    {
      full: "Great Britain",
      short: "GB"
    },
    {
      full: "United States",
      short: "US"
    },
    {
      full: "Canada",
      short: "CA"
    }
  ];
  selectedCountry: string = "GB";
  
  selectedCountryControl = new FormControl(this.selectedCountry);

  //fin test mat select
  htmls: any = 'Rédiger ou charger votre écrit réflexif..........';
  // @Output() deltaChange = new EventEmitter();
  delta: any;
  tabpost: any;
  post: any;
  listedocument:  Array<any>;
    
 
  contactFormModalDocumentName = new FormControl('', Validators.required);


  constructor(public dataservice: DataService) {
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
  // constructor(public http: HttpClient, elm: ElementRef) {}
  ngOnInit(): void { // adding the lifecycle hook ngOnInit
    this.dataservice.setConnect(this.myToken, this.myDomain);
    /**this.dataservice.getDelta().subscribe(data => {
      this.delta = data;
    });*/
    
       this.listedocument = this.dataservice.getAllDocs();
       console.log('this.listedocument :', this.listedocument);
     this.tabpost = this.dataservice.getForum();

  }

  /**  getHTML(){
     return this.htmls;
   }*/

  getHtmlFromDelta() {
    // let delta1 = this.getDeltaOps();
    // tslint:disable-next-line:prefer-const
     this.delta = this.dataservice.getDelta();
     //this.delta =  this.documentControl.value;
     //this.listedocument = this.dataservice.getDelta();
     console.log('get query from service: ', this.listedocument);
    let qdc = new QuillDeltaToHtmlConverter(this.delta['ops'],
      { classPrefix: 'noz' });
    this.delta = qdc;
    console.log('delta: ', this.delta);
   console.log('get query from all data: ', this.dataservice.getAllDocs());
 console.log('longeur: ', this.dataservice.getAllDocs().length);
    this.htmls = qdc.convert();
    //  this.deltaChange.emit(this.htmls);
    
    
  }
  getDeltaOps() {
    this.documentname = this.contactFormModalDocumentName.value;
    console.log('this.documentname:', this.documentname);
    this.delta = this.delta;
    this.dataservice.postDelta(this.delta['ops'], this.documentname);
    // this.deltaChange = new EventEmitter(this.delta);
    console.log(this.delta);
  }

  /**   AfficherDelta(){
         console.log("Delta: "+this.delta['ops']);
         this.deltaChange = new EventEmitter(this.delta);
     }*/


  myValueChange(event) {
    this.htmls = event.value;
  }

  myDeltaChange(event) {
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
}
