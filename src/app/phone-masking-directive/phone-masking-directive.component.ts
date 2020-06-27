import { Component, OnInit } from '@angular/core';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { MY_FORMATS } from './date-adapter';

@Component({
  selector: 'app-phone-masking-directive',
  templateUrl: './phone-masking-directive.component.html',
  styleUrls: ['./phone-masking-directive.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ]
})
export class PhoneMaskingDirectiveComponent implements OnInit {
  constructor() { }
  ngOnInit() {
  }
}
