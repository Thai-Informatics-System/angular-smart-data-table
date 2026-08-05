import { NgModule } from '@angular/core';
import { AngularSmartTableViewerComponent } from './components/angular-smart-data-table/angular-smart-data-table.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { LayoutModule } from '@angular/cdk/layout';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AngularColumnsBtnComponent } from './components/angular-columns-btn/angular-columns-btn.component';
import { AngularSmartTableConfirmationDialogComponent } from './components/angular-smart-table-confirmation-dialog/angular-smart-table-confirmation-dialog.component';
import { AngularSmartTableErrorDialogComponent } from './components/angular-smart-table-error-dialog/angular-smart-table-error-dialog.component';
import { CreateColumnsTemplateComponent } from './components/create-columns-template/create-columns-template.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ScrollingDirective } from './directives/scrolling/scrolling.directive';
import { AngularDatePipe } from './pipes/angular-date.pipe';
import { AngularDateTimePipe } from './pipes/angular-date-time.pipe';
import { AngularDateTimeWithSecondsPipe } from './pipes/angular-date-time-with-seconds.pipe';
import { AngularCurrencyPipe } from './pipes/angular-currency.pipe';
import { Quantity } from './pipes/quantity.pipe';
import { Money } from './pipes/money.pipe';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatSortModule } from '@angular/material/sort';


const directives = [
  ScrollingDirective
];

const pipes = [
  AngularDatePipe,
  AngularDateTimePipe,
  AngularDateTimeWithSecondsPipe,
  AngularCurrencyPipe,
  Quantity,
  Money,
];

const uiImports = [
  MatTooltipModule,
  MatIconModule,
  MatFormFieldModule,
  MatSelectModule,
  MatInputModule,
  MatSnackBarModule,
  MatProgressSpinnerModule,
  MatButtonModule,
  MatPaginatorModule,
  LayoutModule, // For Breakpoint Observer,
  MatDialogModule,
  MatTableModule,
  MatCheckboxModule,
  MatMenuModule,
  MatDividerModule,
  MatSortModule
];


@NgModule({
  declarations: [
    ...directives,
    ...pipes,
    AngularSmartTableViewerComponent,
    AngularColumnsBtnComponent,
    CreateColumnsTemplateComponent,
    AngularSmartTableErrorDialogComponent,
    AngularSmartTableConfirmationDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    RouterOutlet,
    ...uiImports,
    DragDropModule
  ],
  exports: [
    AngularSmartTableViewerComponent
  ]
})
export class AngularSmartTableViewerModule { }
