import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightClassFormComponent } from './flight-class-form.component';

describe('FlightClassFormComponent', () => {
  let component: FlightClassFormComponent;
  let fixture: ComponentFixture<FlightClassFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlightClassFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightClassFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
