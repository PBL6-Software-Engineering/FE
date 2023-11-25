import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowErrorComponent } from './show-error.component';

describe('ShowErrorComponent', () => {
  let component: ShowErrorComponent;
  let fixture: ComponentFixture<ShowErrorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowErrorComponent],
    });
    fixture = TestBed.createComponent(ShowErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
