import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularSmartDataTableErrorDialogComponent } from './angular-smart-data-table-error-dialog.component';

describe('AngularSmartDataTableErrorDialogComponent', () => {
  let component: AngularSmartDataTableErrorDialogComponent;
  let fixture: ComponentFixture<AngularSmartDataTableErrorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AngularSmartDataTableErrorDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AngularSmartDataTableErrorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
