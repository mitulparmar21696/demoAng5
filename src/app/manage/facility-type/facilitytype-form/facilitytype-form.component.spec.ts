import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilitytypeFormComponent } from './facilitytype-form.component';

describe('FacilitytypeFormComponent', () => {
  let component: FacilitytypeFormComponent;
  let fixture: ComponentFixture<FacilitytypeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacilitytypeFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacilitytypeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
