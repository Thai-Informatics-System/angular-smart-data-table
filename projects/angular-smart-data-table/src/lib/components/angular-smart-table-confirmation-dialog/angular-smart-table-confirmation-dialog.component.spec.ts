import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularSmartTableConfirmationDialogComponent } from './angular-smart-table-confirmation-dialog.component';

describe('AngularSmartTableConfirmationDialogComponent', () => {
  let component: AngularSmartTableConfirmationDialogComponent;
  let fixture: ComponentFixture<AngularSmartTableConfirmationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AngularSmartTableConfirmationDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AngularSmartTableConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
