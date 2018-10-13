import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyLandingComponent } from './currency-landing.component';

describe('CurrencyLandingComponent', () => {
  let component: CurrencyLandingComponent;
  let fixture: ComponentFixture<CurrencyLandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrencyLandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencyLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
