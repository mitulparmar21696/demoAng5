import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TourcategoryLandingComponent } from './tourcategory-landing.component';

describe('TourcategoryLandingComponent', () => {
  let component: TourcategoryLandingComponent;
  let fixture: ComponentFixture<TourcategoryLandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TourcategoryLandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TourcategoryLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
