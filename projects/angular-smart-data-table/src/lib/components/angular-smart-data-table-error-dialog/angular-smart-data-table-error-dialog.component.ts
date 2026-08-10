import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'angular-smart-data-table-error-dialog',
  standalone: false,
  templateUrl: './angular-smart-data-table-error-dialog.component.html',
  styleUrl: './angular-smart-data-table-error-dialog.component.css'
})
export class AngularSmartDataTableErrorDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<AngularSmartDataTableErrorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.dialogRef.addPanelClass(['angular-smart-data-table-error-dialog']);
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
