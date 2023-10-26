import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalServiceDetailComponent } from './hospital-service-detail.component';

describe('HospitalServiceDetailComponent', () => {
  let component: HospitalServiceDetailComponent;
  let fixture: ComponentFixture<HospitalServiceDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HospitalServiceDetailComponent]
    });
    fixture = TestBed.createComponent(HospitalServiceDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
