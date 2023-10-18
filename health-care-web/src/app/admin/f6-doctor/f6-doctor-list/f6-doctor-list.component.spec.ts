import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F6DoctorListComponent } from './f6-doctor-list.component';

describe('F6DoctorListComponent', () => {
  let component: F6DoctorListComponent;
  let fixture: ComponentFixture<F6DoctorListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [F6DoctorListComponent]
    });
    fixture = TestBed.createComponent(F6DoctorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
