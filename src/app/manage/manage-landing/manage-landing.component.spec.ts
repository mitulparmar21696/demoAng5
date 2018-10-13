import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageLandingComponent } from './manage-landing.component';

describe('ManageLandingComponent', () => {
  let component: ManageLandingComponent;
  let fixture: ComponentFixture<ManageLandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageLandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
