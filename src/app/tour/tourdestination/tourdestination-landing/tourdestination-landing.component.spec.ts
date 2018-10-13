import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TourdestinationLandingComponent } from './tourdestination-landing.component';

describe('TourdestinationLandingComponent', () => {
  let component: TourdestinationLandingComponent;
  let fixture: ComponentFixture<TourdestinationLandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TourdestinationLandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TourdestinationLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
