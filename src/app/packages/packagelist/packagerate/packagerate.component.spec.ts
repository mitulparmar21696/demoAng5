import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PackagerateComponent } from './packagerate.component';

describe('PackagerateComponent', () => {
  let component: PackagerateComponent;
  let fixture: ComponentFixture<PackagerateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PackagerateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PackagerateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
