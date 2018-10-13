import { TestBed, inject } from '@angular/core/testing';

import { DestinationphotoService } from './destinationphoto.service';

describe('DestinationphotoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DestinationphotoService]
    });
  });

  it('should be created', inject([DestinationphotoService], (service: DestinationphotoService) => {
    expect(service).toBeTruthy();
  }));
});
