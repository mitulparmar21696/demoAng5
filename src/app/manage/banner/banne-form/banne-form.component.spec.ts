import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BanneFormComponent } from './banne-form.component';

describe('BanneFormComponent', () => {
  let component: BanneFormComponent;
  let fixture: ComponentFixture<BanneFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BanneFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BanneFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
