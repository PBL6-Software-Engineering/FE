import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F6DoctorDetailComponent } from './f6-doctor-detail.component';

describe('F6DoctorDetailComponent', () => {
  let component: F6DoctorDetailComponent;
  let fixture: ComponentFixture<F6DoctorDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [F6DoctorDetailComponent],
    });
    fixture = TestBed.createComponent(F6DoctorDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
