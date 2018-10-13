import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightClassLandingComponent } from './flight-class-landing.component';

describe('FlightClassLandingComponent', () => {
  let component: FlightClassLandingComponent;
  let fixture: ComponentFixture<FlightClassLandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlightClassLandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightClassLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
