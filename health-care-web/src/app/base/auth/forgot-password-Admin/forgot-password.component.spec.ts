import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPasswordAdminComponent } from './forgot-password.component';

describe('ForgotPasswordAdminComponent', () => {
  let component: ForgotPasswordAdminComponent;
  let fixture: ComponentFixture<ForgotPasswordAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ForgotPasswordAdminComponent],
    });
    fixture = TestBed.createComponent(ForgotPasswordAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
