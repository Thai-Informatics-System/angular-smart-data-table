import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularSmartTableViewerComponent } from './angular-smart-data-table.component';

describe('AngularSmartTableViewerComponent', () => {
  let component: AngularSmartTableViewerComponent;
  let fixture: ComponentFixture<AngularSmartTableViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AngularSmartTableViewerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AngularSmartTableViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
