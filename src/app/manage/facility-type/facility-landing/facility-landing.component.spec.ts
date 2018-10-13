import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilityLandingComponent } from './facility-landing.component';

describe('FacilityLandingComponent', () => {
  let component: FacilityLandingComponent;
  let fixture: ComponentFixture<FacilityLandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacilityLandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacilityLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
