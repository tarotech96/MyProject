import { TestBed } from '@angular/core/testing';

import { NewuserService } from './newuser.service';

describe('NewuserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NewuserService = TestBed.get(NewuserService);
    expect(service).toBeTruthy();
  });
});
