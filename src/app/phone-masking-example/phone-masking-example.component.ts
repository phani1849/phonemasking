import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-phone-masking-example',
  templateUrl: './phone-masking-example.component.html',
  styleUrls: ['./phone-masking-example.component.scss']
})
export class PhoneMaskingExampleComponent implements OnInit {
  userForm: FormGroup;
  constructor(fb: FormBuilder) {
    this.userForm = fb.group({
      phone: ['', [Validators.minLength]]
    });
  }
  ngOnInit() {
  }

}
