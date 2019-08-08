import { TestBed } from '@angular/core/testing';

import { NewpostService } from './newpost.service';

describe('NewpostService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NewpostService = TestBed.get(NewpostService);
    expect(service).toBeTruthy();
  });
});
