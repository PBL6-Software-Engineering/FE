import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProfileAdminComponent } from './update-profile-admin.component';

describe('UpdateProfileAdminComponent', () => {
  let component: UpdateProfileAdminComponent;
  let fixture: ComponentFixture<UpdateProfileAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateProfileAdminComponent]
    });
    fixture = TestBed.createComponent(UpdateProfileAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
