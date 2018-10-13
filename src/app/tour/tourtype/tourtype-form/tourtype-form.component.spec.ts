import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TourtypeFormComponent } from './tourtype-form.component';

describe('TourtypeFormComponent', () => {
  let component: TourtypeFormComponent;
  let fixture: ComponentFixture<TourtypeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TourtypeFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TourtypeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
