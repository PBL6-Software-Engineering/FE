import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F13LeaveRequestCreateComponent } from './f13-leave-request-create.component';

describe('F13LeaveRequestCreateComponent', () => {
  let component: F13LeaveRequestCreateComponent;
  let fixture: ComponentFixture<F13LeaveRequestCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [F13LeaveRequestCreateComponent]
    });
    fixture = TestBed.createComponent(F13LeaveRequestCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
