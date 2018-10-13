import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TourcategoryFormComponent } from './tourcategory-form.component';

describe('TourcategoryFormComponent', () => {
  let component: TourcategoryFormComponent;
  let fixture: ComponentFixture<TourcategoryFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TourcategoryFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TourcategoryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
