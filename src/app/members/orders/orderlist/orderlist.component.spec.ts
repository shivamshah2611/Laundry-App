import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderlistPage } from './orderlist.page';

describe('OrderlistPage', () => {
  let component: OrderlistPage;
  let fixture: ComponentFixture<OrderlistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderlistPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderlistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
