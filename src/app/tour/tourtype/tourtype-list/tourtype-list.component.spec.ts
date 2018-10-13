import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TourtypeListComponent } from './tourtype-list.component';

describe('TourtypeListComponent', () => {
  let component: TourtypeListComponent;
  let fixture: ComponentFixture<TourtypeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TourtypeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TourtypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
