import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoneMaskingDirectiveComponent } from './phone-masking-directive.component';

describe('PhoneMaskingDirectiveComponent', () => {
  let component: PhoneMaskingDirectiveComponent;
  let fixture: ComponentFixture<PhoneMaskingDirectiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhoneMaskingDirectiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhoneMaskingDirectiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
