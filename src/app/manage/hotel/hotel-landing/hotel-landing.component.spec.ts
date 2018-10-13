import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelLandingComponent } from './hotel-landing.component';

describe('HotelLandingComponent', () => {
  let component: HotelLandingComponent;
  let fixture: ComponentFixture<HotelLandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotelLandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
