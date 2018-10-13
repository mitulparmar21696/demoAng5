import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontUserListingComponent } from './front-user-listing.component';

describe('FrontUserListingComponent', () => {
  let component: FrontUserListingComponent;
  let fixture: ComponentFixture<FrontUserListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrontUserListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrontUserListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
