import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentCategoryLandingComponent } from './document-category-landing.component';

describe('DocumentCategoryLandingComponent', () => {
  let component: DocumentCategoryLandingComponent;
  let fixture: ComponentFixture<DocumentCategoryLandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentCategoryLandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentCategoryLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
