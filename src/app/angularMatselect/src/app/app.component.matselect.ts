import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'my-app',
  templateUrl: './app.component.matselect.html',
  styleUrls: [ './app.component.matselect.scss' ]
})
export class AppMatSelectComponent  {
  selectedCountry = 'GB';
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
  selectedCountryControl = new FormControl(this.selectedCountry);

}
