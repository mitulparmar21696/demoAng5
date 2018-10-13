import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WayToReachLandingComponent } from './way-to-reach-landing.component';

describe('WayToReachLandingComponent', () => {
  let component: WayToReachLandingComponent;
  let fixture: ComponentFixture<WayToReachLandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WayToReachLandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WayToReachLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
