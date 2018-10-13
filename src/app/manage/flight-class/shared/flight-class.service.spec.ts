import { TestBed, inject } from '@angular/core/testing';

import { FlightClassService } from './flight-class.service';

describe('FlightClassService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FlightClassService]
    });
  });

  it('should be created', inject([FlightClassService], (service: FlightClassService) => {
    expect(service).toBeTruthy();
  }));
});
