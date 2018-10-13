import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PackagelandingComponent } from './packagelanding.component';

describe('PackagelandingComponent', () => {
  let component: PackagelandingComponent;
  let fixture: ComponentFixture<PackagelandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PackagelandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PackagelandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
