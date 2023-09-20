import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubHeaderMobileComponent } from './sub-header-mobile.component';

describe('SubHeaderMobileComponent', () => {
  let component: SubHeaderMobileComponent;
  let fixture: ComponentFixture<SubHeaderMobileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubHeaderMobileComponent]
    });
    fixture = TestBed.createComponent(SubHeaderMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
