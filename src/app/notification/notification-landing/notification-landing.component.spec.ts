import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationLandingComponent } from './notification-landing.component';

describe('NotificationLandingComponent', () => {
  let component: NotificationLandingComponent;
  let fixture: ComponentFixture<NotificationLandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationLandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
