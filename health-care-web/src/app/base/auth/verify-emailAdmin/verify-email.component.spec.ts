import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyEmailAdminComponent } from './verify-email.component';

describe('VerifyEmailAdminComponent', () => {
  let component: VerifyEmailAdminComponent;
  let fixture: ComponentFixture<VerifyEmailAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerifyEmailAdminComponent],
    });
    fixture = TestBed.createComponent(VerifyEmailAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
