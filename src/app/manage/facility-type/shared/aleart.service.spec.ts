import { TestBed, inject } from '@angular/core/testing';

import { AleartService } from './aleart.service';

describe('AleartService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AleartService]
    });
  });

  it('should be created', inject([AleartService], (service: AleartService) => {
    expect(service).toBeTruthy();
  }));
});
