import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HometotalComponent } from './hometotal.component';

describe('HometotalComponent', () => {
  let component: HometotalComponent;
  let fixture: ComponentFixture<HometotalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HometotalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HometotalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
