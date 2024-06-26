import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpertDetailComponent } from './expert-detail.component';

describe('ExpertDetailComponent', () => {
  let component: ExpertDetailComponent;
  let fixture: ComponentFixture<ExpertDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExpertDetailComponent],
    });
    fixture = TestBed.createComponent(ExpertDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
