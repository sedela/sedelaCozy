import {Component} from '@angular/core';
import { MatTableDataSource } from '@angular/material';
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
  dataSource =  ELEMENT_DATA;
  dataSource_two =  ELEMENT_DATA_two;
  dataSource_three =  ELEMENT_DATA_three;
  dataSource_four =  ELEMENT_DATA_four;

  favoriteResponse: string;
  panelOpenState: boolean = false;
  reponsepossible = [
    'pas du tout d accord',
    'plutot pas d accord',
    'pas d avis',
    'plutot d accord',
    'tout à fait d accord'
  ];
 
}


export interface Element {
  question: string;
  position: number;
  reponse: string;
}


const ELEMENT_DATA: Element[] = [
  {position: 1, question: 'je crois en ce que je fais', reponse: ''},
  {position: 2, question: 'Je partage les valeurs de l’organisation/Les valeurs de l’organisation sont en contradiction avec les miennes', reponse: ''}  
];

const ELEMENT_DATA_two: Element[] = [
  {position: 1, question: 'J’atteins les objectifs professionnels que je me fixe', reponse: ''}
];

const ELEMENT_DATA_three: Element[] = [
  {position: 1, question: 'J’entreprends toutes les actions possibles dans le cadre de mon activité pour devenir ce que l’on attend de moi ', reponse: ''},
  {position: 2, question: 'Je me sens vite dépassé par un imprévu', reponse: ''},
  {position: 1, question: 'Je connais mes limites', reponse: ''},
  {position: 2, question: '	Je délègue facilement', reponse: ''}
];

const ELEMENT_DATA_four: Element[] = [
  {position: 2, question: 'Je vise l’autonomie des personnes avec qui je travaille', reponse: ''},
  {position: 1, question: 'J’identifie facilement les « bonnes façons de faire » de mon activité professionnelle. J’estime respecter les normes de mon activité', reponse: ''},
  {position: 2, question: '	Face à un accident, incident ou conflit, je réajuste ma pratique rapidement', reponse: ''}
];
