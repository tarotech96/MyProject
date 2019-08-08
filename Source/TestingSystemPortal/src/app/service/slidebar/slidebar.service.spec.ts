import { TestBed } from '@angular/core/testing';

import { SlidebarService } from './slidebar.service';

describe('SlidebarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SlidebarService = TestBed.get(SlidebarService);
    expect(service).toBeTruthy();
  });
});
