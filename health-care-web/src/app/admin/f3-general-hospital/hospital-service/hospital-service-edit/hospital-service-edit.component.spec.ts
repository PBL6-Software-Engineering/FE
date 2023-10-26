import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalServiceEditComponent } from './hospital-service-edit.component';

describe('HospitalServiceEditComponent', () => {
  let component: HospitalServiceEditComponent;
  let fixture: ComponentFixture<HospitalServiceEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HospitalServiceEditComponent]
    });
    fixture = TestBed.createComponent(HospitalServiceEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
