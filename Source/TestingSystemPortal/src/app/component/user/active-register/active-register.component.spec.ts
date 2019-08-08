import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveRegisterComponent } from './active-register.component';

describe('ActiveRegisterComponent', () => {
  let component: ActiveRegisterComponent;
  let fixture: ComponentFixture<ActiveRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiveRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
