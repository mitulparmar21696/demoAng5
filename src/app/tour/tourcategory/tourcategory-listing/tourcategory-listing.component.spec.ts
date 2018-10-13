import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TourcategoryListingComponent } from './tourcategory-listing.component';

describe('TourcategoryListingComponent', () => {
  let component: TourcategoryListingComponent;
  let fixture: ComponentFixture<TourcategoryListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TourcategoryListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TourcategoryListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
