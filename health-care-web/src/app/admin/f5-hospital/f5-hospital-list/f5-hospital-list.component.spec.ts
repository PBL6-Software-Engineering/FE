import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F5HospitalListComponent } from './f5-hospital-list.component';

describe('F5HospitalListComponent', () => {
  let component: F5HospitalListComponent;
  let fixture: ComponentFixture<F5HospitalListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [F5HospitalListComponent]
    });
    fixture = TestBed.createComponent(F5HospitalListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
