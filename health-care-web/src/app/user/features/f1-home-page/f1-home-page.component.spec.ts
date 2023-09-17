import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F1HomePageComponent } from './f1-home-page.component';

describe('F1HomePageComponent', () => {
  let component: F1HomePageComponent;
  let fixture: ComponentFixture<F1HomePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [F1HomePageComponent]
    });
    fixture = TestBed.createComponent(F1HomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
