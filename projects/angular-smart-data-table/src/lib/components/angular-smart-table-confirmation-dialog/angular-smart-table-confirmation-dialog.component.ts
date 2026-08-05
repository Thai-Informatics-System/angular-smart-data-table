import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'angular-smart-table-confirmation-dialog',
  standalone: false,
  templateUrl: './angular-smart-table-confirmation-dialog.component.html',
  styleUrl: './angular-smart-table-confirmation-dialog.component.css'
})
export class AngularSmartTableConfirmationDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<AngularSmartTableConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.dialogRef.addPanelClass(['angular-smart-table-confirmation-dialog']);
  }

  onClose(status: boolean | null): void {
    this.dialogRef.close(status);
  }
}
