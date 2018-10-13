import { TestBed, inject } from '@angular/core/testing';

import { PackageItineraryService } from './package-itinerary.service';

describe('PackageItineraryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PackageItineraryService]
    });
  });

  it('should be created', inject([PackageItineraryService], (service: PackageItineraryService) => {
    expect(service).toBeTruthy();
  }));
});
