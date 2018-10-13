import { TestBed, inject } from '@angular/core/testing';

import { DestinationfaqService } from './destinationfaq.service';

describe('DestinationfaqService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DestinationfaqService]
    });
  });

  it('should be created', inject([DestinationfaqService], (service: DestinationfaqService) => {
    expect(service).toBeTruthy();
  }));
});
