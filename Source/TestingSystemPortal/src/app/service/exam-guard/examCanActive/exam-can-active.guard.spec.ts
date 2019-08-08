import { TestBed, async, inject } from '@angular/core/testing';

import { ExamCanActiveGuard } from './exam-can-active.guard';

describe('ExamCanActiveGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExamCanActiveGuard]
    });
  });

  it('should ...', inject([ExamCanActiveGuard], (guard: ExamCanActiveGuard) => {
    expect(guard).toBeTruthy();
  }));
});
