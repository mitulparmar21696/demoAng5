import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TourdestinationListingComponent } from './tourdestination-listing.component';

describe('TourdestinationListingComponent', () => {
  let component: TourdestinationListingComponent;
  let fixture: ComponentFixture<TourdestinationListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TourdestinationListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TourdestinationListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
