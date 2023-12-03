import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselHomeComponent } from './carousel-home.component';

describe('CarouselComponent', () => {
  let component: CarouselHomeComponent;
  let fixture: ComponentFixture<CarouselHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarouselHomeComponent]
    });
    fixture = TestBed.createComponent(CarouselHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
