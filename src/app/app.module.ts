import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { PhoneMaskDirective } from './phone-mask.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
@NgModule({
  imports:      [ BrowserModule, FormsModule, ReactiveFormsModule, BrowserAnimationsModule, MatInputModule ],
  declarations: [ AppComponent, PhoneMaskDirective ],
   exports: [
    PhoneMaskDirective
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { 

}
