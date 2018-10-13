import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartypeListComponent } from './cartype-list.component';

describe('CartypeListComponent', () => {
  let component: CartypeListComponent;
  let fixture: ComponentFixture<CartypeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartypeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
