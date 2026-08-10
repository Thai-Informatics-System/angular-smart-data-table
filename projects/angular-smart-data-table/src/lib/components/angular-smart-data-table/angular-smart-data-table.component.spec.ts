import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

import { AngularSmartDataTableComponent } from './angular-smart-data-table.component';
import { AngularSmartDataTableModule } from '../../angular-smart-data-table.module';

describe('AngularSmartDataTableComponent', () => {
  let component: AngularSmartDataTableComponent;
  let fixture: ComponentFixture<AngularSmartDataTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // Import the library module rather than declaring the component alone, so
      // its child components and Material dependencies resolve.
      imports: [AngularSmartDataTableModule],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AngularSmartDataTableComponent);
    component = fixture.componentInstance;

    // All five of these are @Input({ required: true }) and are read during
    // init, so they have to be set before the first change detection.
    component.columnCustomizationUrlConfig = {
      list: '/api/columns/list',
      add: '/api/columns/add',
      update: '/api/columns/update',
      delete: '/api/columns/delete',
      getSelectedTemplate: '/api/columns/selected',
      updateSelectedTemplate: '/api/columns/selected/update',
    };
    component.t = (key: string) => key;
    component.componentName = 'demo';
    component.mainTitle = 'Demo';
    component.columnsCodeMapping = [
      { name: 'id', type: 'string', serverKeyCode: 'id', valueKey: 'id', sort: true },
    ];

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
