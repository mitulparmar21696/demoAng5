import { TestBed, inject } from '@angular/core/testing';

import { DocumentUploadService } from './document-upload.service';

describe('DocumentUploadService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DocumentUploadService]
    });
  });

  it('should be created', inject([DocumentUploadService], (service: DocumentUploadService) => {
    expect(service).toBeTruthy();
  }));
});
