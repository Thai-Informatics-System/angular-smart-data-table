import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

import { AngularColumnsBtnComponent } from './angular-columns-btn.component';
import { AngularSmartDataTableModule } from '../../angular-smart-data-table.module';

describe('AngularColumnsBtnComponent', () => {
  let component: AngularColumnsBtnComponent;
  let fixture: ComponentFixture<AngularColumnsBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AngularSmartDataTableModule],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AngularColumnsBtnComponent);
    component = fixture.componentInstance;

    // columnCustomizationUrlConfig is @Input({ required: true }) and is read
    // during init, so it has to be set before the first change detection.
    component.columnCustomizationUrlConfig = {
      list: '/api/columns/list',
      add: '/api/columns/add',
      update: '/api/columns/update',
      delete: '/api/columns/delete',
      getSelectedTemplate: '/api/columns/selected',
      updateSelectedTemplate: '/api/columns/selected/update',
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
