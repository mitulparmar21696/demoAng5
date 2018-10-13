import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentCategoryListingComponent } from './document-category-listing.component';

describe('DocumentCategoryListingComponent', () => {
  let component: DocumentCategoryListingComponent;
  let fixture: ComponentFixture<DocumentCategoryListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentCategoryListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentCategoryListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
