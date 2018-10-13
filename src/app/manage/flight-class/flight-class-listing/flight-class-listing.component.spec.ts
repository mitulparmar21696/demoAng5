import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightClassListingComponent } from './flight-class-listing.component';

describe('FlightClassListingComponent', () => {
  let component: FlightClassListingComponent;
  let fixture: ComponentFixture<FlightClassListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlightClassListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightClassListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
