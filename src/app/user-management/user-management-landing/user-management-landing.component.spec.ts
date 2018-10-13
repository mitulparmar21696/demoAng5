import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserManagementLandingComponent } from './user-management-landing.component';

describe('UserManagementLandingComponent', () => {
  let component: UserManagementLandingComponent;
  let fixture: ComponentFixture<UserManagementLandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserManagementLandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserManagementLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
