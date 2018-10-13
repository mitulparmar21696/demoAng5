import { TestBed, inject } from '@angular/core/testing';

import { PackageHotelService } from './package-hotel.service';

describe('PackageHotelService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PackageHotelService]
    });
  });

  it('should be created', inject([PackageHotelService], (service: PackageHotelService) => {
    expect(service).toBeTruthy();
  }));
});
