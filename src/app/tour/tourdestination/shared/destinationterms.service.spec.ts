import { TestBed, inject } from '@angular/core/testing';

import { DestinationtermsService } from './destinationterms.service';

describe('DestinationtermsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DestinationtermsService]
    });
  });

  it('should be created', inject([DestinationtermsService], (service: DestinationtermsService) => {
    expect(service).toBeTruthy();
  }));
});
