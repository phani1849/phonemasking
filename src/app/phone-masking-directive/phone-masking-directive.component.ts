import { Component, OnInit, Input, HostListener, ElementRef, ViewChild } from '@angular/core';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { MY_FORMATS, MyDateAdapter, DateValidator } from './date-adapter';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DATEPICKER_VALIDATORS } from '@angular/material';

@Component({
  selector: 'app-phone-masking-directive',
  templateUrl: './phone-masking-directive.component.html',
  styleUrls: ['./phone-masking-directive.component.scss'],
  providers: [   
    {
      provide: DateAdapter,
      useClass: MyDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class PhoneMaskingDirectiveComponent implements OnInit {
  formGroup: FormGroup;
  @ViewChild('accNo',{static:true}) accNo: ElementRef;
  constructor(private formBuilder: FormBuilder) { }
  ngOnInit() {
    this.createForm();
  }
  createForm() {
    this.formGroup = this.formBuilder.group({
      'fromDate': [new Date(), [DateValidator.dateValidator]],
      'accno': ['', [Validators.required]],
      'phone':  ['', [Validators.required]]
    });
  }
  onSubmit(values){
    console.log(values);
  }
}
