import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDisableAccountComponent } from './user-disable-account.component';

describe('UserDisableAccountComponent', () => {
  let component: UserDisableAccountComponent;
  let fixture: ComponentFixture<UserDisableAccountComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserDisableAccountComponent]
    });
    fixture = TestBed.createComponent(UserDisableAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
