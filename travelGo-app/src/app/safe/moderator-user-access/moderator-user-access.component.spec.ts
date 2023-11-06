import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeratorUserAccessComponent } from './moderator-user-access.component';

describe('ModeratorUserAccessComponent', () => {
  let component: ModeratorUserAccessComponent;
  let fixture: ComponentFixture<ModeratorUserAccessComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModeratorUserAccessComponent]
    });
    fixture = TestBed.createComponent(ModeratorUserAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
