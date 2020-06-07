import { Component, EventEmitter } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, FormsModule, NgControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html'
})
export class AppComponent {
  userForm: FormGroup;
  constructor(fb: FormBuilder) {
    this.userForm = fb.group({
      phone: ['', [Validators.minLength]]
    });
  }
}