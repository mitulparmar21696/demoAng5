import { TestBed, inject } from '@angular/core/testing';

import { FacilityTypeService } from './facility-type.service';

describe('FacilityTypeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FacilityTypeService]
    });
  });

  it('should be created', inject([FacilityTypeService], (service: FacilityTypeService) => {
    expect(service).toBeTruthy();
  }));
});
