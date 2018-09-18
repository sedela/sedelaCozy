import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-select',
  templateUrl: './app.component.matselect.html',
  styleUrls: [ './app.component.matselect.scss' ]
})
export class AppMatSelectComponent  {
  
  constructor() {}

  countries: any = [
    {
      full: 'Great Britain',
      short: 'GB'
    },
    {
      full: 'United States',
      short: 'US'
    },
    {
      full: 'Canada',
      short: 'CA'
    }
  ];
  selectedCountry: any = 'GB';
  selectedCountryControl = new FormControl(this.selectedCountry);

}
