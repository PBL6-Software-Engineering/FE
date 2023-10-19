import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F13LeaveRequestDetailComponent } from './f13-leave-request-detail.component';

describe('F13LeaveRequestDetailComponent', () => {
  let component: F13LeaveRequestDetailComponent;
  let fixture: ComponentFixture<F13LeaveRequestDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [F13LeaveRequestDetailComponent]
    });
    fixture = TestBed.createComponent(F13LeaveRequestDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
