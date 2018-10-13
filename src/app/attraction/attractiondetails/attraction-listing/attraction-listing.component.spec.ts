import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttractionListingComponent } from './attraction-listing.component';

describe('AttractionListingComponent', () => {
  let component: AttractionListingComponent;
  let fixture: ComponentFixture<AttractionListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttractionListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttractionListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
