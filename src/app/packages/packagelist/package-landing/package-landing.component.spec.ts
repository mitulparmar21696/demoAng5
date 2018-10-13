import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PackageListLandingComponent } from './package-landing.component';

describe('PackageLandingComponent', () => {
  let component: PackageListLandingComponent;
  let fixture: ComponentFixture<PackageListLandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PackageListLandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PackageListLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
