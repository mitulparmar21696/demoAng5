import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PackageImagesComponent } from './package-images.component';

describe('PackageImagesComponent', () => {
  let component: PackageImagesComponent;
  let fixture: ComponentFixture<PackageImagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PackageImagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PackageImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
