import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawerPanelsComponent } from './drawer-panels.component';

describe('DrawerPanelsComponent', () => {
  let component: DrawerPanelsComponent;
  let fixture: ComponentFixture<DrawerPanelsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrawerPanelsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawerPanelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
