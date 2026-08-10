import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularSmartDataTableComponent } from './angular-smart-data-table.component';

describe('AngularSmartDataTableComponent', () => {
  let component: AngularSmartDataTableComponent;
  let fixture: ComponentFixture<AngularSmartDataTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AngularSmartDataTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AngularSmartDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
