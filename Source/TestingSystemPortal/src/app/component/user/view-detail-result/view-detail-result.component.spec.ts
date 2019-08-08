import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDetailResultComponent } from './view-detail-result.component';

describe('ViewDetailResultComponent', () => {
  let component: ViewDetailResultComponent;
  let fixture: ComponentFixture<ViewDetailResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewDetailResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDetailResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
