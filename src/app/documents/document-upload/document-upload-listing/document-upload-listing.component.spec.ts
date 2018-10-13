import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentUploadListingComponent } from './document-upload-listing.component';

describe('DocumentUploadListingComponent', () => {
  let component: DocumentUploadListingComponent;
  let fixture: ComponentFixture<DocumentUploadListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentUploadListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentUploadListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
