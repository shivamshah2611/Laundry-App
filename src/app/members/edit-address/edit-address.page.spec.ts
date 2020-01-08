import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAddressPage } from './edit-address.page';

describe('EditAddressPage', () => {
  let component: EditAddressPage;
  let fixture: ComponentFixture<EditAddressPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAddressPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAddressPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
