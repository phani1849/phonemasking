import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeterialDatatableResizeComponent } from './meterial-datatable-resize.component';

describe('MeterialDatatableResizeComponent', () => {
  let component: MeterialDatatableResizeComponent;
  let fixture: ComponentFixture<MeterialDatatableResizeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeterialDatatableResizeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeterialDatatableResizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
