import {Component} from '@angular/core';
//import { MatTableDataSource } from '@angular/material';
/**
 * @title Radios with ngModel
 */
@Component({
  selector: 'radio-ng-model-example',
  templateUrl: 'radio-ng-model-example.html',
  styleUrls: ['radio-ng-model-example.css'],
})
export class RadioNgModelExample {

  displayedColumns = ['position','question', 'reponse'];
  dataSource = ELEMENT_DATA;

  favoriteResponse: string;

  reponsepossible = [
    'pas du tout d accord',
    'plutot pas d accord',
    'pas d avis',
    'plutot d accord',
    'tout à fait d accord'
  ];
}


export interface Element {
  question : string;
  position: number;
  reponse: string;
}


const ELEMENT_DATA: Element[] = [
  {position: 1, question: 'je crois en ce que je fais', reponse: '2'},
  {position: 2, question: 'je suis fier de ce je fais', reponse: '1'},
  {position: 3, question: 'j atteint les objectifs professionels que je me fixe', reponse: '3'},
  
];