import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomTypeLandingComponent } from './room-type-landing.component';

describe('RoomTypeLandingComponent', () => {
  let component: RoomTypeLandingComponent;
  let fixture: ComponentFixture<RoomTypeLandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomTypeLandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomTypeLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
