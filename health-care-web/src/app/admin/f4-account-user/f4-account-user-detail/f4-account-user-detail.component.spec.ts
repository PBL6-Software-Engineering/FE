import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F4AccountUserDetailComponent } from './f4-account-user-detail.component';

describe('F4AccountUserDetailComponent', () => {
  let component: F4AccountUserDetailComponent;
  let fixture: ComponentFixture<F4AccountUserDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [F4AccountUserDetailComponent],
    });
    fixture = TestBed.createComponent(F4AccountUserDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
