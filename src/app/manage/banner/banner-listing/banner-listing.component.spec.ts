import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerListingComponent } from './banner-listing.component';

describe('BannerListingComponent', () => {
  let component: BannerListingComponent;
  let fixture: ComponentFixture<BannerListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BannerListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
