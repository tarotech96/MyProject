import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamDetailAdminComponent } from './exam-detail-admin.component';

describe('ExamDetailAdminComponent', () => {
  let component: ExamDetailAdminComponent;
  let fixture: ComponentFixture<ExamDetailAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamDetailAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamDetailAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
