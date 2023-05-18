import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Component404Component } from './component404.component';

describe('Component404Component', () => {
  let component: Component404Component;
  let fixture: ComponentFixture<Component404Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Component404Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Component404Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
