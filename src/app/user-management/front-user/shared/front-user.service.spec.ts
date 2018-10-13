import { TestBed, inject } from '@angular/core/testing';

import { FrontUserService } from './front-user.service';

describe('FrontUserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FrontUserService]
    });
  });

  it('should be created', inject([FrontUserService], (service: FrontUserService) => {
    expect(service).toBeTruthy();
  }));
});
