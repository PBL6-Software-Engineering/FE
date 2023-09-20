import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderInfoUserComponent } from './header-info-user.component';

describe('HeaderInfoUserComponent', () => {
  let component: HeaderInfoUserComponent;
  let fixture: ComponentFixture<HeaderInfoUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderInfoUserComponent]
    });
    fixture = TestBed.createComponent(HeaderInfoUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
