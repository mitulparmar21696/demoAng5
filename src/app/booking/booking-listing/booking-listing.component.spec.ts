import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingListingComponent } from './booking-listing.component';

describe('BookingListingComponent', () => {
  let component: BookingListingComponent;
  let fixture: ComponentFixture<BookingListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
