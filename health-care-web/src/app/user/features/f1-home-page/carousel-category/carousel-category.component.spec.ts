import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselCategoryComponent } from './carousel-category.component';

describe('CarouselCategoryComponent', () => {
  let component: CarouselCategoryComponent;
  let fixture: ComponentFixture<CarouselCategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarouselCategoryComponent],
    });
    fixture = TestBed.createComponent(CarouselCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
