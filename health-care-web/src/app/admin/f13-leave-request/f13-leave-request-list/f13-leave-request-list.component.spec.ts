import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F13LeaveRequestListComponent } from './f13-leave-request-list.component';

describe('F13LeaveRequestListComponent', () => {
  let component: F13LeaveRequestListComponent;
  let fixture: ComponentFixture<F13LeaveRequestListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [F13LeaveRequestListComponent]
    });
    fixture = TestBed.createComponent(F13LeaveRequestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
