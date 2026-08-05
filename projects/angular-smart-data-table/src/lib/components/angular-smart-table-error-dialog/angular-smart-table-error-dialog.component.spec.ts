import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularSmartTableErrorDialogComponent } from './angular-smart-table-error-dialog.component';

describe('AngularSmartTableErrorDialogComponent', () => {
  let component: AngularSmartTableErrorDialogComponent;
  let fixture: ComponentFixture<AngularSmartTableErrorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AngularSmartTableErrorDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AngularSmartTableErrorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
