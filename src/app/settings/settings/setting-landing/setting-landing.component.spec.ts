import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingLandingComponent } from './setting-landing.component';

describe('SettingLandingComponent', () => {
  let component: SettingLandingComponent;
  let fixture: ComponentFixture<SettingLandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingLandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
