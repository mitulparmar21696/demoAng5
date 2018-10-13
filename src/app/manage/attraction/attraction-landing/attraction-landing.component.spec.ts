import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttractionLandingComponent } from './attraction-landing.component';

describe('AttractionLandingComponent', () => {
  let component: AttractionLandingComponent;
  let fixture: ComponentFixture<AttractionLandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttractionLandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttractionLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
