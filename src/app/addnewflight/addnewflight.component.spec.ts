import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddnewflightComponent } from './addnewflight.component';

describe('AddnewflightComponent', () => {
  let component: AddnewflightComponent;
  let fixture: ComponentFixture<AddnewflightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddnewflightComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddnewflightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
