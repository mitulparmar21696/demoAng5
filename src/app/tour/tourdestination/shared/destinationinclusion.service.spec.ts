import { TestBed, inject } from '@angular/core/testing';

import { DestinationinclusionService } from './destinationinclusion.service';

describe('DestinationinclusionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DestinationinclusionService]
    });
  });

  it('should be created', inject([DestinationinclusionService], (service: DestinationinclusionService) => {
    expect(service).toBeTruthy();
  }));
});
