import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontUserLandingComponent } from './front-user-landing.component';

describe('FrontUserLandingComponent', () => {
  let component: FrontUserLandingComponent;
  let fixture: ComponentFixture<FrontUserLandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrontUserLandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrontUserLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
