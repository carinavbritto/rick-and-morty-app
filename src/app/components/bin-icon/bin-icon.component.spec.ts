import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BinIconComponent } from './bin-icon.component';

describe('BinIconComponent', () => {
  let component: BinIconComponent;
  let fixture: ComponentFixture<BinIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BinIconComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BinIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
