import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { QuillModule } from 'ngx-quill';
import { DataService } from './appmodel.service';

import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TypicodeInterceptor } from './typicode.interceptor';
import { AppModelComponent } from './appmodel.component';
import { AppForumComponent } from './appforum.component';


// mdbbootstrap module

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MDBBootstrapModule, InputsModule, WavesModule, ButtonsModule } from 'angular-bootstrap-md';

//Angular material

import { AppMatSelectComponent } from './angularMatselect/src/app/app.component.matselect';


@NgModule({
  declarations: [
    AppComponent,
   AppModelComponent,
   AppForumComponent,
   AppMatSelectComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    QuillModule,
    HttpClientModule,
    MDBBootstrapModule.forRoot(),
    InputsModule.forRoot(),
     WavesModule.forRoot(),
    ButtonsModule.forRoot()
  ],
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
