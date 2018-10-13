import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingListingComponent } from './setting-listing.component';

describe('SettingListingComponent', () => {
  let component: SettingListingComponent;
  let fixture: ComponentFixture<SettingListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
