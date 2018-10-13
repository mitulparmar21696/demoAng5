import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PackageItineraryComponent } from './package-itinerary.component';

describe('PackageItineraryComponent', () => {
  let component: PackageItineraryComponent;
  let fixture: ComponentFixture<PackageItineraryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PackageItineraryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PackageItineraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
