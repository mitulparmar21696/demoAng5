import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilitytypeLandingComponent } from './facilitytype-landing.component';

describe('FacilitytypeLandingComponent', () => {
  let component: FacilitytypeLandingComponent;
  let fixture: ComponentFixture<FacilitytypeLandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacilitytypeLandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacilitytypeLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
