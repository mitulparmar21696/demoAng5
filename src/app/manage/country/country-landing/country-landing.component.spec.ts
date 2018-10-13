import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryLandingComponent } from './country-landing.component';

describe('CountryLandingComponent', () => {
  let component: CountryLandingComponent;
  let fixture: ComponentFixture<CountryLandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountryLandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
