import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectAddressPage } from './select-address.page';

describe('SelectAddressPage', () => {
  let component: SelectAddressPage;
  let fixture: ComponentFixture<SelectAddressPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectAddressPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectAddressPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
