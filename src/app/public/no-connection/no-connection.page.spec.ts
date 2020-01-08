import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoConnectionPage } from './no-connection.page';

describe('NoConnectionPage', () => {
  let component: NoConnectionPage;
  let fixture: ComponentFixture<NoConnectionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoConnectionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoConnectionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
