import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallBmiComponent } from './call-bmi.component';

describe('CallBmiComponent', () => {
  let component: CallBmiComponent;
  let fixture: ComponentFixture<CallBmiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CallBmiComponent],
    });
    fixture = TestBed.createComponent(CallBmiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
