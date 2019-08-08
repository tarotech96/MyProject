import { TestBed } from '@angular/core/testing';

import { UploadfileServiceService } from './uploadfile-service.service';

describe('UploadfileServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UploadfileServiceService = TestBed.get(UploadfileServiceService);
    expect(service).toBeTruthy();
  });
});
