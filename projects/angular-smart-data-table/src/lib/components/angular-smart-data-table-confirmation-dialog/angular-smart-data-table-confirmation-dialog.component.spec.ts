import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';

import { AngularSmartDataTableConfirmationDialogComponent } from './angular-smart-data-table-confirmation-dialog.component';
import { AngularSmartDataTableModule } from '../../angular-smart-data-table.module';

describe('AngularSmartDataTableConfirmationDialogComponent', () => {
  let component: AngularSmartDataTableConfirmationDialogComponent;
  let fixture: ComponentFixture<AngularSmartDataTableConfirmationDialogComponent>;

  beforeEach(async () => {
    // The component styles its own dialog on init, so the ref stub needs the
    // panel-class methods as well as close().
    const dialogRefStub = {
      close: () => {},
      addPanelClass: () => {},
      removePanelClass: () => {},
      afterClosed: () => of(undefined),
            beforeClosed: () => of(undefined),
      updateSize: () => {},
    };

    await TestBed.configureTestingModule({
      imports: [AngularSmartDataTableModule],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        { provide: MatDialogRef, useValue: dialogRefStub },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ]
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
