import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttractiondetailsLandingComponent } from './attractiondetails-landing.component';

describe('AttractiondetailsLandingComponent', () => {
  let component: AttractiondetailsLandingComponent;
  let fixture: ComponentFixture<AttractiondetailsLandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttractiondetailsLandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttractiondetailsLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
