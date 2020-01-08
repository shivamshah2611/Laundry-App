import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PincodePage } from './pincode.page';

describe('PincodePage', () => {
  let component: PincodePage;
  let fixture: ComponentFixture<PincodePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PincodePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PincodePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
