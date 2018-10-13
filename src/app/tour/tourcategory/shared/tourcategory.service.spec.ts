import { TestBed, inject } from '@angular/core/testing';

import { TourcategoryService } from './tourcategory.service';

describe('TourcategoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TourcategoryService]
    });
  });

  it('should be created', inject([TourcategoryService], (service: TourcategoryService) => {
    expect(service).toBeTruthy();
  }));
});
