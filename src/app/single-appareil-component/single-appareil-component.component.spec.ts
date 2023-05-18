import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleAppareilComponentComponent } from './single-appareil-component.component';

describe('SingleAppareilComponentComponent', () => {
  let component: SingleAppareilComponentComponent;
  let fixture: ComponentFixture<SingleAppareilComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleAppareilComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleAppareilComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
