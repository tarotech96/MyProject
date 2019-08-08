import { TestBed } from '@angular/core/testing';

import { MenuFilterService } from '../menu_filter/menu-filter.service';

describe('MenuFilterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MenuFilterService = TestBed.get(MenuFilterService);
    expect(service).toBeTruthy();
  });
});
