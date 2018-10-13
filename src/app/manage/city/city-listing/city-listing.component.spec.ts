import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CityListingComponent } from './city-listing.component';

describe('CityListingComponent', () => {
  let component: CityListingComponent;
  let fixture: ComponentFixture<CityListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CityListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CityListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
