import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalServiceCreateComponent } from './hospital-service-create.component';

describe('HospitalServiceCreateComponent', () => {
  let component: HospitalServiceCreateComponent;
  let fixture: ComponentFixture<HospitalServiceCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HospitalServiceCreateComponent],
    });
    fixture = TestBed.createComponent(HospitalServiceCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
