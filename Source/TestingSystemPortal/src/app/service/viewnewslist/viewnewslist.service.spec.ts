import { TestBed } from '@angular/core/testing';

import { ViewnewslistService } from './viewnewslist.service';

describe('ViewnewslistService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ViewnewslistService = TestBed.get(ViewnewslistService);
    expect(service).toBeTruthy();
  });
});
