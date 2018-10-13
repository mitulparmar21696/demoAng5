import { TestBed, inject } from '@angular/core/testing';

import { WayToReachService } from './way-to-reach.service';

describe('WayToReachService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WayToReachService]
    });
  });

  it('should be created', inject([WayToReachService], (service: WayToReachService) => {
    expect(service).toBeTruthy();
  }));
});
