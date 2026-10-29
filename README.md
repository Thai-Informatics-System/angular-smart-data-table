
# Angular Smart Data Table

`@servicemind.tis/angular-smart-data-table` is an Angular component library that provides a highly configurable and reusable smart table component for enterprise applications.

---

## 🌟 Features

- Customizable columns and templates
- Filter form integration with URL syncing
- Column customization templates with API integration
- Internationalization support (e.g., Transloco)
- Custom row background styling
- Built-in pagination and sorting
- Inline error state with Retry when loading fails
- Dynamic slot and template injection for full control

---

## Compatibility

| Library | Angular, Material, CDK |
|---|---|
| 2.x | 22.x |
| 1.x | 19.x |

**2.0.0** — built with Angular 22 (partial compilation), so it needs Angular 22 and does not work on older versions; stay on 1.x for Angular 19. `@angular/forms`, `@angular/router` and `luxon` (used by the date pipes) are now declared peers. Colours fall back to Material 3 system tokens (`--mat-sys-*`), so the table follows an M3 app theme; the `--angular-*` variables still override them.

---

## 🚀 Installation

```bash
npm install @servicemind.tis/angular-smart-data-table
```

### Peer Dependencies

```bash
npm install @angular/material@^22 @angular/cdk@^22 luxon@^3
```

---

## 🔧 Usage Example

### `app.component.html`

```html
<ng-container *transloco="let t; read: 'serviceManagement.serviceRequestListComponent'">
  <angular-smart-data-table
    #mainTableWrapper
    [columnCustomizationUrlConfig]="columnCustomizationUrlConfig"
    [t]="t"
    componentName="cm-service-request"
    [mainTitle]="t('list')"
    [breadcrumbs]="[{url: '/admin/service-management/cases', name: t('breadcrumb')}]"
    [columnsCodeMapping]="columnsCodeMapping"
    [searchPlaceholder]="t('searchPlaceholder')"
    [loadDataApiBaseUrl]="loadDataApiBaseUrl"
    [(pageSize)]="pageSize"
    [(pageIndex)]="pageIndex"
    [hideHeader]="true"
    [rowsConfig]="rowsConfig"
    [filterFormGroup]="filterFormGroup"
    [keepFilterInUrl]="false"
    [dataNotFoundConfig]="{
        title: t('noDataFound'),
        desc: t('noDataFoundDescription'),
        btnText: t('addNew'),
        btnUrl: '/admin/service-management/cases/add'
    }"
  >
    <!-- Custom slots like filter buttons, filter section, templates, etc. -->
  </angular-smart-data-table>
</ng-container>
```

### `app.component.ts`

```ts
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {
  SmartTableWrapperColumnsConfig,
  SmartTableWrapperRowsConfig,
  AngularSmartDataTableComponent,
  ColumnCustomizationUrlConfig
} from 'angular-smart-data-table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('mainTableWrapper') tableListViewWrapperComponent!: AngularSmartDataTableComponent;

  columnsCodeMapping: SmartTableWrapperColumnsConfig[] = [
    { name: 'action', serverKeyCode: 'action', type: 'action', sort: false, template: this.actionColumnTemplate },
    { name: 'description', serverKeyCode: 'description', type: 'string', sort: true, template: this.descriptionColumnTemplate },
    { name: 'sourceOfRequest', serverKeyCode: 'sourceOfRequest', type: 'string', template: this.sourceOfReColumnTemplate },
    { name: 'status', serverKeyCode: 'cmStatusId', type: 'string', template: this.statusColumnTemplate },
    // Add more columns as needed...
  ];

  @ViewChild('actionColumnTemplate') set actionColumnTemplate(tpl: TemplateRef<any>) {
    this.setColumnTemplate('action', tpl);
  }
  @ViewChild('descriptionColumnTemplate') set descriptionColumnTemplate(tpl: TemplateRef<any>) {
    this.setColumnTemplate('description', tpl);
  }
  @ViewChild('sourceOfReColumnTemplate') set sourceOfReColumnTemplate(tpl: TemplateRef<any>) {
    this.setColumnTemplate('sourceOfRequest', tpl);
  }
  @ViewChild('statusColumnTemplate') set statusColumnTemplate(tpl: TemplateRef<any>) {
    this.setColumnTemplate('status', tpl);
  }

  filterFormGroup!: FormGroup;
  isShowFilter = false;
  pageSize = 10;
  pageIndex = 0;
  loadDataApiBaseUrl = 'https://mocki.io/v1/2f34e933-74dc-4433-83ac-b66991f7e472';
  columnCustomizationUrlConfig: ColumnCustomizationUrlConfig = {
    list: '/user-customization/get-columns-templates',
    add: '/user-customization/add-columns-template',
    update: '/user-customization/update-columns-template',
    delete: '/user-customization/delete-columns-template',
    getSelectedTemplate: '/user-customization/get-selected-columns-template',
    updateSelectedTemplate: '/user-customization/update-selected-columns-template'
  };

  rowsConfig: SmartTableWrapperRowsConfig = {
    backgroundApplyFunction: (row: any) => row.viewsCount === 0 ? '#f2f6fc' : null
  };

  ngOnInit() {
    this.filterFormGroup = new FormGroup({
      type: new FormControl(null)
    });
  }

  setColumnTemplate(name: string, template: TemplateRef<any>) {
    const col = this.columnsCodeMapping.find(c => c.name === name);
    if (col) col.template = template;
    this.columnsCodeMapping = [...this.columnsCodeMapping];
  }

  filterRecords() {
    this.tableListViewWrapperComponent.filterRecords();
    this.changeFilterVisibility();
  }

  changeFilterVisibility() {
    this.isShowFilter = !this.isShowFilter;
    this.tableListViewWrapperComponent.isShowFilter = this.isShowFilter;
  }

  onReset() {
    this.filterFormGroup.reset();
    this.filterRecords();
  }
}
```

---

## 🧠 Key Interfaces

### `SmartTableWrapperColumnsConfig`

```ts
export interface SmartTableWrapperColumnsConfig {
    name: string;
    type: 'string' | 'number' | 'quantity' | 'money' | 'date' | 'date-time' | 'date-time-with-seconds' | 'action';
    align?: 'left' | 'right' | 'center' | null;
    serverKeyCode: string;
    valueKey?: string;
    template?: TemplateRef<any>;
    sort: boolean;
    clickFn?: (rec: any, event?: MouseEvent) => void;
    filterFormKey?: string;
    transformQueryParamFn?: Function;
}
```

### `SmartTableWrapperRowsConfig`

```ts
export interface SmartTableWrapperRowsConfig {
    backgroundApplyFunction?: (row: any) => string | null;
}
```

### `SelectedFilterDisplayValueType`

```ts
export type SelectedFilterDisplayValueType = {
    value: any | any[] | null;
    labelKey?: string | number | null;
    valueKey: any | null;
    formControlName: string;
    formControlType: 'input' | 'radio' | 'date' | 'date-time' | 'toggle' | 'checkbox' | 'chip' | 'select' | 'search-select';
    isSingleValue?: boolean;
    selectedObjData?: any;
};
```

### `SelectedFilterDisplayValuesType`

```ts
export type SelectedFilterDisplayValuesType = SelectedFilterDisplayValueType[];
```

### `AnyKeyValueObject`

```ts
export type AnyKeyValueObject = Record<string, any>;
```

### `SelectedFiltersGroupedValuesType`

```ts
export type SelectedFiltersGroupedValuesType = {
    formControlName: string;
    formControlType: string;
    arrValues: SelectedFilterDisplayValueType[];
};
```

### `ColumnCustomizationUrlConfig`

```ts
export interface ColumnCustomizationUrlConfig {
    list: string;
    add: string;
    update: string;
    delete: string;
    getSelectedTemplate: string;
    updateSelectedTemplate: string;
}
```

### `DataNotFoundConfig`

```ts
export type DataNotFoundConfig = {
    title: string;
    desc: string;
    btnText?: string | null;
    btnUrl?: string | null;
    btnClick?: null | ((rec: any, event?: MouseEvent) => void);
    secondBtnText?: string | null;
    secondBtnUrl?: string | null;
    secondBtnClick?: null | ((rec: any, event?: MouseEvent) => void);
};
```

---

## ⚠️ Error state (2.0.0+)

When the list request fails, the table shows an inline error in place of the rows: the first error message from the response, the request id in small text (when there is one), and a **Retry** button that reloads the current page with the same page size, search, filters and sort. The header, search and filters stay usable. A later successful load clears the error.

The default parser (`toSmartTableLoadError`, exported) reads `{ errors: [{ code, message, field?, params? }], requestId }`, and also `{ message }`, a JSON body sent as text, and the `X-Request-Id` response header. Transport text such as "Http failure response for …" is never shown; the fallback message is used instead.

| Input | Type | Default | Purpose |
|---|---|---|---|
| `loadError` | `SmartTableLoadError \| string \| null` | `null` | The error shown. Set it to show your own error, `null` hides it; `[(loadError)]` keeps your copy in sync. |
| `showLoadErrorState` | `boolean` | `true` | `false` keeps the 1.x behaviour (empty table); `loadError` and `onLoadError` still report the failure. |
| `loadErrorFallbackMessage` | `string` | `'Something went wrong while loading the data. Please try again.'` | Shown when the error has no message. |
| `loadErrorRetryBtnText` | `string` | `'Retry'` | Retry button label. |
| `loadErrorRequestIdLabel` | `string` | `'Request ID'` | Label before the request id. |
| `loadErrorMapper` | `(error: unknown) => SmartTableLoadError` | `toSmartTableLoadError` | Parse a different error shape. |

| Output | Payload | When |
|---|---|---|
| `loadErrorChange` | `SmartTableLoadError \| null` | The error is set or cleared. |
| `onLoadError` | `SmartTableLoadError` | The list request failed. |
| `onRetry` | `void` | The user clicked Retry (the table reloads by itself). |

Public methods (through a template reference or `@ViewChild`): `retry()` reloads the current page, `setLoadError(error)` shows an error (a string is shown as is; anything else goes through `loadErrorMapper`), `clearLoadError()` hides it.

```html
<ng-container *transloco="let t; read: 'units'">
  <angular-smart-data-table
    #table
    ...
    [loadErrorFallbackMessage]="t('loadErrorFallback')"
    [loadErrorRetryBtnText]="t('retry')"
    [loadErrorRequestIdLabel]="t('requestId')"
    (onLoadError)="onUnitsLoadError($event)"
  ></angular-smart-data-table>
</ng-container>
```

```ts
export type SmartTableLoadError = {
    message?: string | null;   // shown; empty -> loadErrorFallbackMessage
    requestId?: string | null; // shown in small text when present
    code?: string | null;      // code of the first API error
    status?: number | null;    // HTTP status (0 = network error)
    errors?: SmartTableApiErrorItem[]; // all API errors
    cause?: unknown;           // the original error
};
```

The state uses the classes `.angular-load-error`, `.angular-load-error-icon`, `.angular-load-error-message`, `.angular-load-error-request-id` and `.angular-load-error-retry`; the icon takes `--angular-danger` (then `--mat-sys-error`), the request id `--angular-text-subtle` (then `--mat-sys-on-surface-variant`).

---

## 📦 Module Setup

Make sure to import `AngularSmartDataTableModule` and necessary Angular Material modules in your app module or standalone components.

---


## 🤝 Contributing

1. Clone the repo
2. Run `npm install`
3. Use the demo app to test (`projects/` directory)
4. Submit a PR or issue with details

---

## 🚀 Publishing to npm

```bash
git tag v1.0.0
git push origin v1.0.0
```

GitHub Actions will build and publish to npm automatically if configured.

---

## 📬 Support / Questions

For bugs, suggestions, or feature requests, please open an issue on the [GitHub repository](https://github.com/Thai-Informatics-System/angular-smart-data-table).

---

> Made with ❤️ by [Thai Informatic Systems Co. Ltd](https://tis.co.th/)
