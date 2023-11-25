import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalInfoComponent } from './hospital-info.component';

describe('HospitalInfoComponent', () => {
  let component: HospitalInfoComponent;
  let fixture: ComponentFixture<HospitalInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HospitalInfoComponent],
    });
    fixture = TestBed.createComponent(HospitalInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
