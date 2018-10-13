import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilitytypeListingComponent } from './facilitytype-listing.component';

describe('FacilitytypeListingComponent', () => {
  let component: FacilitytypeListingComponent;
  let fixture: ComponentFixture<FacilitytypeListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacilitytypeListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacilitytypeListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
