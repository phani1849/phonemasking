import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawerTitleComponent } from './drawer-title.component';

describe('DrawerTitleComponent', () => {
  let component: DrawerTitleComponent;
  let fixture: ComponentFixture<DrawerTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrawerTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawerTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
