import {CdkTableModule} from '@angular/cdk/table';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Angular Material
import {
 
  MatFormFieldModule,
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
} from '@angular/material';
//import { NO_ERRORS_SCHEMA } from '@angular/core';


import { AppComponent, DialogOverviewExampleDialog } from './app.component';
import { QuillModule } from 'ngx-quill';
import { DataService } from './appmodel.service';

import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TypicodeInterceptor } from './typicode.interceptor';
import { AppModelComponent } from './appmodel.component';
import { AppForumComponent } from './appforum.component';


import { AppMatSelectComponent } from './angularMatselect/src/app/app.component.matselect';


@NgModule({
  declarations: [
    AppComponent,
    DialogOverviewExampleDialog,
   AppModelComponent,
   AppForumComponent,
   AppMatSelectComponent,
   
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    QuillModule,
    HttpClientModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    
  ],
  entryComponents: [ AppComponent, DialogOverviewExampleDialog],
 // exports: [AppComponent],
  
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [
    {
     provide: HTTP_INTERCEPTORS,
     useClass: TypicodeInterceptor,
     multi: true
   },
    DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
