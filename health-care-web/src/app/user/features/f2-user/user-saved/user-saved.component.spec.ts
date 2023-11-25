import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSavedComponent } from './user-saved.component';

describe('UserSavedComponent', () => {
  let component: UserSavedComponent;
  let fixture: ComponentFixture<UserSavedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserSavedComponent],
    });
    fixture = TestBed.createComponent(UserSavedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
