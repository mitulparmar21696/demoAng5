import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WayToReachFormComponent } from './way-to-reach-form.component';

describe('WayToReachFormComponent', () => {
  let component: WayToReachFormComponent;
  let fixture: ComponentFixture<WayToReachFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WayToReachFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WayToReachFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
