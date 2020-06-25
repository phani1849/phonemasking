import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatePickerMaskingComponent } from './date-picker-masking.component';

describe('DatePickerMaskingComponent', () => {
  let component: DatePickerMaskingComponent;
  let fixture: ComponentFixture<DatePickerMaskingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatePickerMaskingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatePickerMaskingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
