import { TestBed, inject } from '@angular/core/testing';

import { PackageimageService } from './packageimage.service';

describe('PackageimageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PackageimageService]
    });
  });

  it('should be created', inject([PackageimageService], (service: PackageimageService) => {
    expect(service).toBeTruthy();
  }));
});
