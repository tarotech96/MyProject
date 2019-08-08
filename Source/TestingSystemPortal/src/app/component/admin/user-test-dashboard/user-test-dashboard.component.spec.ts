import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTestDashboardComponent } from './user-test-dashboard.component';

describe('UserTestDashboardComponent', () => {
  let component: UserTestDashboardComponent;
  let fixture: ComponentFixture<UserTestDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserTestDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserTestDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
