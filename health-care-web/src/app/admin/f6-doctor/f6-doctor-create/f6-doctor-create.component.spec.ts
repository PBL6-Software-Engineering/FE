import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F6DoctorCreateComponent } from './f6-doctor-create.component';

describe('F6DoctorCreateComponent', () => {
  let component: F6DoctorCreateComponent;
  let fixture: ComponentFixture<F6DoctorCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [F6DoctorCreateComponent]
    });
    fixture = TestBed.createComponent(F6DoctorCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
