import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WayToReachListingComponent } from './way-to-reach-listing.component';

describe('WayToReachListingComponent', () => {
  let component: WayToReachListingComponent;
  let fixture: ComponentFixture<WayToReachListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WayToReachListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WayToReachListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
