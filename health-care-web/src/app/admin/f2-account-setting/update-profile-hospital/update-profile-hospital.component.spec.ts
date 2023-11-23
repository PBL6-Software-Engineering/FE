import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProfileHospitalComponent } from './update-profile-hospital.component';

describe('UpdateProfileHospitalComponent', () => {
  let component: UpdateProfileHospitalComponent;
  let fixture: ComponentFixture<UpdateProfileHospitalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateProfileHospitalComponent]
    });
    fixture = TestBed.createComponent(UpdateProfileHospitalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
