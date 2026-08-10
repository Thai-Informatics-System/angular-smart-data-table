import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularSmartDataTableConfirmationDialogComponent } from './angular-smart-data-table-confirmation-dialog.component';

describe('AngularSmartDataTableConfirmationDialogComponent', () => {
  let component: AngularSmartDataTableConfirmationDialogComponent;
  let fixture: ComponentFixture<AngularSmartDataTableConfirmationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AngularSmartDataTableConfirmationDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AngularSmartDataTableConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
