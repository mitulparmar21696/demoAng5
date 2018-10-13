import { TestBed, inject } from '@angular/core/testing';

import { CartypeService } from './cartype.service';

describe('CartypeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CartypeService]
    });
  });

  it('should be created', inject([CartypeService], (service: CartypeService) => {
    expect(service).toBeTruthy();
  }));
});
