import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PackageInclusionComponent } from './package-inclusion.component';

describe('PackageInclusionComponent', () => {
  let component: PackageInclusionComponent;
  let fixture: ComponentFixture<PackageInclusionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PackageInclusionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PackageInclusionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
