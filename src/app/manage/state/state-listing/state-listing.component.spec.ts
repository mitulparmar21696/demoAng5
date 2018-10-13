import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StateListingComponent } from './state-listing.component';

describe('StateListingComponent', () => {
  let component: StateListingComponent;
  let fixture: ComponentFixture<StateListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StateListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StateListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
