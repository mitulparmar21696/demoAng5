import { TestBed, inject } from '@angular/core/testing';

import { PackageinfoService } from './packageinfo.service';

describe('PackageinfoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PackageinfoService]
    });
  });

  it('should be created', inject([PackageinfoService], (service: PackageinfoService) => {
    expect(service).toBeTruthy();
  }));
});
