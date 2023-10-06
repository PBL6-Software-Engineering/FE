import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F4AccountUserListComponent } from './f4-account-user-list.component';

describe('F4AccountUserListComponent', () => {
  let component: F4AccountUserListComponent;
  let fixture: ComponentFixture<F4AccountUserListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [F4AccountUserListComponent]
    });
    fixture = TestBed.createComponent(F4AccountUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
