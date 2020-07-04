import { Component, OnInit, Input } from '@angular/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { MY_FORMATS } from './date-adapter';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-phone-masking-directive',
  templateUrl: './phone-masking-directive.component.html',
  styleUrls: ['./phone-masking-directive.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter      
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ]
})
export class PhoneMaskingDirectiveComponent implements OnInit {
  formGroup: FormGroup;
  constructor(private formBuilder: FormBuilder) { }
  ngOnInit() {
    this.createForm();
  }
  createForm() {
    this.formGroup = this.formBuilder.group({
      'fromDate': [new Date(), [Validators.required]],
      'accno': ['', [Validators.required]],
    });
  }
  onSubmit(values){
    console.log(values);
  }
}
