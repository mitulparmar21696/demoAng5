import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartypeLandingComponent } from './cartype-landing.component';

describe('CartypeLandingComponent', () => {
  let component: CartypeLandingComponent;
  let fixture: ComponentFixture<CartypeLandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartypeLandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartypeLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
