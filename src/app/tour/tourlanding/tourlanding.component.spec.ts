import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TourlandingComponent } from './tourlanding.component';

describe('TourlandingComponent', () => {
  let component: TourlandingComponent;
  let fixture: ComponentFixture<TourlandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TourlandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TourlandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
