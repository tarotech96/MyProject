import { TestBed } from '@angular/core/testing';

import { MatrixUsersRoleService } from './matrix-users-role.service';

describe('MatrixUsersRoleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MatrixUsersRoleService = TestBed.get(MatrixUsersRoleService);
    expect(service).toBeTruthy();
  });
});
