import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceLandingComponent } from './invoice-landing.component';

describe('InvoiceLandingComponent', () => {
  let component: InvoiceLandingComponent;
  let fixture: ComponentFixture<InvoiceLandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceLandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
