import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TourdestinationFormComponent } from './tourdestination-form.component';

describe('TourdestinationFormComponent', () => {
  let component: TourdestinationFormComponent;
  let fixture: ComponentFixture<TourdestinationFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TourdestinationFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TourdestinationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
