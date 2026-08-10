import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'angular-smart-data-table-confirmation-dialog',
  standalone: false,
  templateUrl: './angular-smart-data-table-confirmation-dialog.component.html',
  styleUrl: './angular-smart-data-table-confirmation-dialog.component.css'
})
export class AngularSmartDataTableConfirmationDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<AngularSmartDataTableConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.dialogRef.addPanelClass(['angular-smart-data-table-confirmation-dialog']);
  }

  onClose(status: boolean | null): void {
    this.dialogRef.close(status);
  }
}
