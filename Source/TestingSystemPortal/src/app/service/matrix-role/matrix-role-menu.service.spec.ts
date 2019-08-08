import { TestBed } from '@angular/core/testing';

import { MatrixRoleMenuService } from './matrix-role-menu.service';

describe('MatrixRoleMenuService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MatrixRoleMenuService = TestBed.get(MatrixRoleMenuService);
    expect(service).toBeTruthy();
  });
});
