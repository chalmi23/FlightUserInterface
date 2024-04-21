import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayflightsComponent } from './displayflights.component';

describe('DisplayflightsComponent', () => {
  let component: DisplayflightsComponent;
  let fixture: ComponentFixture<DisplayflightsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplayflightsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DisplayflightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
