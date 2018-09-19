import { Component, Input} from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-select',
  templateUrl: './app.component.matselect.html',
  styleUrls: [ './app.component.matselect.scss' ]
})
export class AppMatSelectComponent  {
  //contactForm
  countryForm: FormGroup;
  @Input() countries: Array <any> = [];

  constructor(private fb: FormBuilder) {}

 
ngOnInit() {
this.countryForm = this.fb.group({
            countryControl: [this.countries[1]]
        });
}
 
 
  
addNewOption(name: string, code: string) {
  setTimeout(() => {
    this.countries.push({name, code});
this.countryForm.controls['countryControl'].patchValue(
     this.countries
  )
 }, 100)
}

}
