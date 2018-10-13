import { TestBed, inject } from '@angular/core/testing';

import { DocumentCategoryService } from './document-category.service';

describe('DocumentCategoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DocumentCategoryService]
    });
  });

  it('should be created', inject([DocumentCategoryService], (service: DocumentCategoryService) => {
    expect(service).toBeTruthy();
  }));
});
