import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F4AccountUserEditComponent } from './f4-account-user-edit.component';

describe('F4AccountUserEditComponent', () => {
  let component: F4AccountUserEditComponent;
  let fixture: ComponentFixture<F4AccountUserEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [F4AccountUserEditComponent]
    });
    fixture = TestBed.createComponent(F4AccountUserEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
