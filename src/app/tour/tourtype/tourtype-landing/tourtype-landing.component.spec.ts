import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TourtypeLandingComponent } from './tourtype-landing.component';

describe('TourtypeLandingComponent', () => {
  let component: TourtypeLandingComponent;
  let fixture: ComponentFixture<TourtypeLandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TourtypeLandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TourtypeLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
