import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient, withXhr } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

import { AngularSmartDataTableComponent } from './angular-smart-data-table.component';
import { AngularSmartDataTableModule } from '../../angular-smart-data-table.module';
import type { SmartTableLoadError } from '../../interfaces';

describe('AngularSmartDataTableComponent', () => {
  let component: AngularSmartDataTableComponent;
  let fixture: ComponentFixture<AngularSmartDataTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // Import the library module rather than declaring the component alone, so
      // its child components and Material dependencies resolve.
      imports: [AngularSmartDataTableModule],
      providers: [
        provideHttpClient(withXhr()),
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

describe('AngularSmartDataTableComponent error state', () => {
  const listUrl = '/api/units/list';
  let component: AngularSmartDataTableComponent;
  let fixture: ComponentFixture<AngularSmartDataTableComponent>;
  let http: HttpTestingController;

  const element = (): HTMLElement => fixture.nativeElement as HTMLElement;
  const errorState = (): HTMLElement | null => element().querySelector('.angular-load-error');
  const expectListRequest = () => http.expectOne(req => req.url.startsWith(listUrl));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AngularSmartDataTableModule],
      providers: [
        provideHttpClient(withXhr()),
        provideHttpClientTesting(),
        provideRouter([]),
      ]
    })
    .compileComponents();

    http = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(AngularSmartDataTableComponent);
    component = fixture.componentInstance;

    // setInput runs ngOnChanges, which creates the data source for loadDataApiBaseUrl.
    fixture.componentRef.setInput('columnCustomizationUrlConfig', {
      list: '/api/columns/list',
      add: '/api/columns/add',
      update: '/api/columns/update',
      delete: '/api/columns/delete',
      getSelectedTemplate: '/api/columns/selected',
      updateSelectedTemplate: '/api/columns/selected/update',
    });
    fixture.componentRef.setInput('t', {});
    fixture.componentRef.setInput('componentName', 'units');
    fixture.componentRef.setInput('mainTitle', 'Units');
    fixture.componentRef.setInput('dataNotFoundConfig', { title: 'No units' });
    fixture.componentRef.setInput('columnsCodeMapping', [
      { name: 'code', type: 'string', serverKeyCode: 'code', valueKey: 'code' },
    ]);
    fixture.componentRef.setInput('keepFilterInUrl', false);
    fixture.componentRef.setInput('pageIndex', 2);
    fixture.componentRef.setInput('loadDataApiBaseUrl', listUrl);
  });

  it('shows the first API error message and the request id, and Retry reloads the same page', () => {
    const emitted: (SmartTableLoadError | null)[] = [];
    component.loadErrorChange.subscribe(e => emitted.push(e));
    const failed: SmartTableLoadError[] = [];
    component.onLoadError.subscribe(e => failed.push(e));

    fixture.detectChanges();
    const first = expectListRequest();
    expect(first.request.url).toContain('current_page=3');
    first.flush(
      { errors: [{ code: 'UNIT_LIST_FAILED', message: 'Units could not be loaded.' }], requestId: 'req_abc' },
      { status: 500, statusText: 'Server Error' },
    );
    fixture.detectChanges();

    const state = errorState();
    expect(state).withContext('error state rendered').not.toBeNull();
    expect(state!.textContent).toContain('Units could not be loaded.');
    expect(state!.querySelector('.angular-load-error-request-id')!.textContent).toContain('Request ID: req_abc');
    expect(element().textContent).not.toContain('No units');
    expect(failed.length).toBe(1);
    expect(failed[0].code).toBe('UNIT_LIST_FAILED');
    expect(emitted[emitted.length - 1]?.requestId).toBe('req_abc');

    state!.querySelector<HTMLButtonElement>('.angular-load-error-retry')!.click();
    const retry = expectListRequest();
    expect(retry.request.url).toContain('current_page=3');
    retry.flush({ data: [{ id: 1, code: 'A-101' }], total: 1, page: 3, pageSize: 10 });
    fixture.detectChanges();

    expect(errorState()).toBeNull();
    expect(component.loadError).toBeNull();
    expect(emitted[emitted.length - 1]).toBeNull();
    expect(element().textContent).toContain('A-101');
  });

  it('uses the fallback text and the label inputs when the error has no message', () => {
    fixture.componentRef.setInput('loadErrorFallbackMessage', 'ไม่สามารถโหลดข้อมูลได้');
    fixture.componentRef.setInput('loadErrorRetryBtnText', 'ลองอีกครั้ง');
    fixture.detectChanges();

    expectListRequest().flush('', { status: 0, statusText: 'Unknown Error' });
    fixture.detectChanges();

    const state = errorState();
    expect(state).not.toBeNull();
    expect(state!.textContent).toContain('ไม่สามารถโหลดข้อมูลได้');
    expect(state!.textContent).toContain('ลองอีกครั้ง');
    expect(state!.querySelector('.angular-load-error-request-id')).toBeNull();
  });

  it('lets the app set and clear the error', () => {
    fixture.detectChanges();
    expectListRequest().flush({ data: [{ id: 1, code: 'A-101' }], total: 1 });
    fixture.detectChanges();
    expect(errorState()).toBeNull();

    fixture.componentRef.setInput('loadError', 'Your session expired.');
    fixture.detectChanges();
    expect(errorState()!.textContent).toContain('Your session expired.');
    expect(element().textContent).not.toContain('A-101');

    component.clearLoadError();
    fixture.detectChanges();
    expect(errorState()).toBeNull();

    component.setLoadError({ errors: [{ code: 'X', message: 'Set from code' }], requestId: 'r-1' });
    fixture.detectChanges();
    expect(errorState()!.textContent).toContain('Set from code');
    expect(errorState()!.textContent).toContain('r-1');
  });

  it('keeps the 1.x empty table when showLoadErrorState is false', () => {
    fixture.componentRef.setInput('showLoadErrorState', false);
    const failed: SmartTableLoadError[] = [];
    component.onLoadError.subscribe(e => failed.push(e));
    fixture.detectChanges();

    expectListRequest().flush({ errors: [{ message: 'Nope' }] }, { status: 500, statusText: 'Server Error' });
    fixture.detectChanges();

    expect(errorState()).toBeNull();
    expect(failed[0].message).toBe('Nope');
    expect(component.loadError?.message).toBe('Nope');
  });
});
