import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserExamComponent } from './user-exam.component';

describe('UserExamComponent', () => {
  let component: UserExamComponent;
  let fixture: ComponentFixture<UserExamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserExamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
