import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveForgotComponent } from './active-forgot.component';

describe('ActiveForgotComponent', () => {
  let component: ActiveForgotComponent;
  let fixture: ComponentFixture<ActiveForgotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiveForgotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveForgotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
