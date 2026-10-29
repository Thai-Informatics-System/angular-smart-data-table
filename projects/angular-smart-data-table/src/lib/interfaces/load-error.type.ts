/**
 * One entry of an API error response, e.g.
 * `{ errors: [{ code: 'UNIT_NOT_FOUND', message: 'Unit not found', field: 'unitId' }], requestId: 'req_123' }`.
 */
export type SmartTableApiErrorItem = {
    code?: string;
    message?: string;
    field?: string;
    params?: Record<string, unknown>;
};

/**
 * Error shown by the table's inline error state (when loading data fails).
 *
 * Set it yourself through the `loadError` input or `setLoadError()`, or let the
 * table fill it when the list request fails.
 */
export type SmartTableLoadError = {
    /** Text shown in the error state. When empty, the `loadErrorFallbackMessage` input is shown. */
    message?: string | null;
    /** Request id from the API response, shown in small text when present. */
    requestId?: string | null;
    /** Code of the first API error, when the response has one. */
    code?: string | null;
    /** HTTP status of the failed request (0 for network errors), when known. */
    status?: number | null;
    /** All errors returned by the API, when the response has them. */
    errors?: SmartTableApiErrorItem[];
    /** The original error (e.g. an `HttpErrorResponse`), for logging. */
    cause?: unknown;
};

/** Turns any thrown error into a `SmartTableLoadError`. Used by the `loadErrorMapper` input. */
export type SmartTableLoadErrorMapper = (error: unknown) => SmartTableLoadError;
