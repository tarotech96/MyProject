import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamDetailUserComponent } from './exam-detail-user.component';

describe('ExamDetailUserComponent', () => {
  let component: ExamDetailUserComponent;
  let fixture: ComponentFixture<ExamDetailUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamDetailUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamDetailUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
