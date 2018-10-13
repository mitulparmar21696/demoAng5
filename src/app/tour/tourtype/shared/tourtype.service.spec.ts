import { TestBed, inject } from '@angular/core/testing';

import { TourtypeService } from './tourtype.service';

describe('TourtypeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TourtypeService]
    });
  });

  it('should be created', inject([TourtypeService], (service: TourtypeService) => {
    expect(service).toBeTruthy();
  }));
});
