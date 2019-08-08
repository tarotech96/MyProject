import { TestBed } from '@angular/core/testing';

import { DatatranferService } from './datatranfer.service';

describe('DatatranferService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DatatranferService = TestBed.get(DatatranferService);
    expect(service).toBeTruthy();
  });
});
