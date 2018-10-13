import { TestBed, inject } from '@angular/core/testing';

import { PackageinclusionService } from './packageinclusion.service';

describe('PackageinclusionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PackageinclusionService]
    });
  });

  it('should be created', inject([PackageinclusionService], (service: PackageinclusionService) => {
    expect(service).toBeTruthy();
  }));
});
