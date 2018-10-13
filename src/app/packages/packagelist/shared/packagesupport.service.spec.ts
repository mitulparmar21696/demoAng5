import { TestBed, inject } from '@angular/core/testing';

import { PackagesupportService } from './packagesupport.service';

describe('PackagesupportService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PackagesupportService]
    });
  });

  it('should be created', inject([PackagesupportService], (service: PackagesupportService) => {
    expect(service).toBeTruthy();
  }));
});
