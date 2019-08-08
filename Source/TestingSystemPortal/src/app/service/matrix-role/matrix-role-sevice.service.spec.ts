import { TestBed } from '@angular/core/testing';

import { MatrixRoleSeviceService } from './matrix-role-sevice.service';

describe('MatrixRoleSeviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MatrixRoleSeviceService = TestBed.get(MatrixRoleSeviceService);
    expect(service).toBeTruthy();
  });
});
