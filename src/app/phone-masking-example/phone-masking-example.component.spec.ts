import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoneMaskingExampleComponent } from './phone-masking-example.component';

describe('PhoneMaskingExampleComponent', () => {
  let component: PhoneMaskingExampleComponent;
  let fixture: ComponentFixture<PhoneMaskingExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhoneMaskingExampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhoneMaskingExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
