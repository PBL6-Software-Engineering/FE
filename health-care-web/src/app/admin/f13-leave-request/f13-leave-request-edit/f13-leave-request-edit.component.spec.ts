import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F13LeaveRequestEditComponent } from './f13-leave-request-edit.component';

describe('F13LeaveRequestEditComponent', () => {
  let component: F13LeaveRequestEditComponent;
  let fixture: ComponentFixture<F13LeaveRequestEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [F13LeaveRequestEditComponent]
    });
    fixture = TestBed.createComponent(F13LeaveRequestEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
