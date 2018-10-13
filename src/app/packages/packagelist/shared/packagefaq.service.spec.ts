import { TestBed, inject } from '@angular/core/testing';

import { PackagefaqService } from './packagefaq.service';

describe('PackagefaqService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PackagefaqService]
    });
  });

  it('should be created', inject([PackagefaqService], (service: PackagefaqService) => {
    expect(service).toBeTruthy();
  }));
});
