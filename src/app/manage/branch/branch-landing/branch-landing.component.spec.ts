import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchLandingComponent } from './branch-landing.component';

describe('BranchLandingComponent', () => {
  let component: BranchLandingComponent;
  let fixture: ComponentFixture<BranchLandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BranchLandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
