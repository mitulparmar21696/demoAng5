import { TestBed, inject } from '@angular/core/testing';

import { AleartService } from './alert.service';

describe('AlertService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AleartService]
    });
  });

  it('should be created', inject([AleartService], (service: AleartService) => {
    expect(service).toBeTruthy();
  }));
});
