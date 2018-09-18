import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-select',
  templateUrl: './app.component.matselect.html',
  styleUrls: [ './app.component.matselect.scss' ]
})
export class AppMatSelectComponent  {
  
  contactForm: FormGroup;
  constructor() {
    this.contactForm = this.createFormGroup();
   }

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

  // Step 1
  createFormGroup() {
    return new FormGroup({
      personalData: new FormGroup({
        country: new FormControl()
      })
    });
  }
}
