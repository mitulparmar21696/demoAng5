import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PackageSupportComponent } from './package-support.component';

describe('PackageSupportComponent', () => {
  let component: PackageSupportComponent;
  let fixture: ComponentFixture<PackageSupportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PackageSupportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PackageSupportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
