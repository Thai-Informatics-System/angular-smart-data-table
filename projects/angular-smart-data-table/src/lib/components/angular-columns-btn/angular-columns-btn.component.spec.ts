import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularColumnsBtnComponent } from './angular-columns-btn.component';

describe('AngularColumnsBtnComponent', () => {
  let component: AngularColumnsBtnComponent;
  let fixture: ComponentFixture<AngularColumnsBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AngularColumnsBtnComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AngularColumnsBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
