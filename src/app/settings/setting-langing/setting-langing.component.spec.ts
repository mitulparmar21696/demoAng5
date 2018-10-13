import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingLangingComponent } from './setting-langing.component';

describe('SettingLangingComponent', () => {
  let component: SettingLangingComponent;
  let fixture: ComponentFixture<SettingLangingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingLangingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingLangingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
