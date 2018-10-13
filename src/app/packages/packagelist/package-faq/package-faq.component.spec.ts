import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PackageFaqComponent } from './package-faq.component';

describe('PackageFaqComponent', () => {
  let component: PackageFaqComponent;
  let fixture: ComponentFixture<PackageFaqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PackageFaqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PackageFaqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
