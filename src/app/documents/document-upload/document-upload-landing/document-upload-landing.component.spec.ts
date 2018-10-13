import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentUploadLandingComponent } from './document-upload-landing.component';

describe('DocumentUploadLandingComponent', () => {
  let component: DocumentUploadLandingComponent;
  let fixture: ComponentFixture<DocumentUploadLandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentUploadLandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentUploadLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
