import { TestBed } from '@angular/core/testing';

import { UserdatatranferService } from './userdatatranfer.service';

describe('UserdatatranferService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserdatatranferService = TestBed.get(UserdatatranferService);
    expect(service).toBeTruthy();
  });
});
