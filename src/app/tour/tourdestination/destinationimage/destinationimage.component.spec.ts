import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DestinationimageComponent } from './destinationimage.component';

describe('DestinationimageComponent', () => {
  let component: DestinationimageComponent;
  let fixture: ComponentFixture<DestinationimageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DestinationimageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DestinationimageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
