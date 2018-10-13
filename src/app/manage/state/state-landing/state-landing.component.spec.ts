import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StateLandingComponent } from './state-landing.component';

describe('StateLandingComponent', () => {
  let component: StateLandingComponent;
  let fixture: ComponentFixture<StateLandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StateLandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StateLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
