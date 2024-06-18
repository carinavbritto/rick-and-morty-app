import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeartOutlineIconComponent } from './heart-outline-icon.component';

describe('HeartOutlineIconComponent', () => {
  let component: HeartOutlineIconComponent;
  let fixture: ComponentFixture<HeartOutlineIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeartOutlineIconComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeartOutlineIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
