import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'angular-smart-table-error-dialog',
  standalone: false,
  templateUrl: './angular-smart-table-error-dialog.component.html',
  styleUrl: './angular-smart-table-error-dialog.component.css'
})
export class AngularSmartTableErrorDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<AngularSmartTableErrorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.dialogRef.addPanelClass(['angular-smart-table-error-dialog']);
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
