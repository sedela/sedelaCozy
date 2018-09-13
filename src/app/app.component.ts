import { Component, OnInit, Injectable, Input, ElementRef } from '@angular/core';
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
    <div id="droite"> <app-forum></app-forum> </div>
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
  // @Input()
  @Input() myToken: any = 2;
  @Input() data: any = {};
  @Input() myDomain: any = 3;
  htmls: any = 'Rédiger ou charger votre écrit réflexif..........';
  // @Output() deltaChange = new EventEmitter();
  delta: any;
  post: any;


  constructor(public dataservice: DataService, elm: ElementRef) {
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
    this.dataservice.getForum();

   // this.dataservice.deleteForum();
    // this.deltaChange = new EventEmitter();
  }

  /**  getHTML(){
     return this.htmls;
   }*/

  getHtmlFromDelta() {
    // let delta1 = this.getDeltaOps();
    // tslint:disable-next-line:prefer-const
     this.delta = this.dataservice.getDelta();
     console.log('get query from service: ',this.delta)
    let qdc = new QuillDeltaToHtmlConverter(this.delta['ops'],
      { classPrefix: 'noz' });
    this.delta = qdc;
    console.log('delta: ', this.delta);
    this.htmls = qdc.convert();
    //  this.deltaChange.emit(this.htmls);

  }
  getDeltaOps() {
    this.delta = this.delta;
    this.dataservice.postDelta(this.delta['ops']);
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
    this.post = event.value;
    this.dataservice.postForum(this.post);
  }
}
