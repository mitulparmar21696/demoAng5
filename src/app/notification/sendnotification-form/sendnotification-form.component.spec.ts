import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendnotificationFormComponent } from './sendnotification-form.component';

describe('SendnotificationFormComponent', () => {
  let component: SendnotificationFormComponent;
  let fixture: ComponentFixture<SendnotificationFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendnotificationFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendnotificationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
