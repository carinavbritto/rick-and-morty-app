import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoResultsMessageComponent } from './no-results-message.component';

describe('NoResultsMessageComponent', () => {
  let component: NoResultsMessageComponent;
  let fixture: ComponentFixture<NoResultsMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoResultsMessageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoResultsMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
