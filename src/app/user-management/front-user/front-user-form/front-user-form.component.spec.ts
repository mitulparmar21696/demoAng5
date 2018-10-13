import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontUserFormComponent } from './front-user-form.component';

describe('FrontUserFormComponent', () => {
  let component: FrontUserFormComponent;
  let fixture: ComponentFixture<FrontUserFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrontUserFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrontUserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
