import { TestBed, inject } from '@angular/core/testing';

import { PackagerateService } from './packagerate.service';

describe('PackagerateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PackagerateService]
    });
  });

  it('should be created', inject([PackagerateService], (service: PackagerateService) => {
    expect(service).toBeTruthy();
  }));
});
