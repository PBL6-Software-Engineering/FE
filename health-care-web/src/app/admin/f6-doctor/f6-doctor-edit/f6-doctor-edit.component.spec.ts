import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F6DoctorEditComponent } from './f6-doctor-edit.component';

describe('F6DoctorEditComponent', () => {
  let component: F6DoctorEditComponent;
  let fixture: ComponentFixture<F6DoctorEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [F6DoctorEditComponent],
    });
    fixture = TestBed.createComponent(F6DoctorEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
