import { HttpErrorResponse } from '@angular/common/http';
import type { SmartTableApiErrorItem, SmartTableLoadError } from '../interfaces/load-error.type';

const REQUEST_ID_HEADERS = ['x-request-id', 'request-id', 'x-correlation-id'];

function isObject(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null;
}

function nonEmptyString(value: unknown): string | null {
    return typeof value === 'string' && value.trim() !== '' ? value : null;
}

function readErrors(body: Record<string, unknown>): SmartTableApiErrorItem[] {
    const errors = body['errors'];
    if (!Array.isArray(errors)) {
        return [];
    }
    return errors.filter(isObject) as SmartTableApiErrorItem[];
}

function readRequestIdHeader(error: HttpErrorResponse): string | null {
    for (const name of REQUEST_ID_HEADERS) {
        const value = nonEmptyString(error.headers?.get(name));
        if (value) {
            return value;
        }
    }
    return null;
}

/** Parses a response body of the shape `{ errors: [{ code, message, field?, params? }], requestId }` (or `{ message }`). */
function fromBody(body: unknown): SmartTableLoadError {
    if (typeof body === 'string') {
        // A JSON body sent with a non-JSON content type arrives as text.
        try {
            return fromBody(JSON.parse(body));
        } catch {
            return {};
        }
    }

    if (!isObject(body)) {
        return {};
    }

    const errors = readErrors(body);
    const first = errors[0];

    return {
        message: nonEmptyString(first?.message) ?? nonEmptyString(body['message']),
        code: nonEmptyString(first?.code) ?? nonEmptyString(body['code']),
        requestId: nonEmptyString(body['requestId']) ?? nonEmptyString(body['request_id']),
        errors: errors.length ? errors : undefined,
    };
}

/**
 * Default `loadErrorMapper`: reads the first error message and the request id from
 * `{ errors: [{ code, message, field?, params? }], requestId }`, and also accepts a plain
 * string, `{ message }` or a `SmartTableLoadError`. Transport messages such as
 * "Http failure response for ..." are never shown; the fallback text is used instead.
 */
export function toSmartTableLoadError(error: unknown): SmartTableLoadError {
    if (error instanceof HttpErrorResponse) {
        const parsed = fromBody(error.error);
        return {
            ...parsed,
            requestId: parsed.requestId ?? readRequestIdHeader(error),
            status: error.status,
            cause: error,
        };
    }

    if (typeof error === 'string') {
        return { message: nonEmptyString(error) };
    }

    if (error instanceof Error) {
        // Runtime errors carry technical text; show the fallback message instead.
        return { cause: error };
    }

    if (isObject(error)) {
        const parsed = fromBody(error);
        const status = typeof error['status'] === 'number' ? error['status'] : null;
        return {
            ...parsed,
            status: status ?? parsed.status ?? null,
            errors: parsed.errors ?? (Array.isArray(error['errors']) ? readErrors(error) : undefined),
            cause: error['cause'] ?? error,
        };
    }

    return { cause: error };
}

/** Normalises what a consumer passes to the `loadError` input. */
export function normalizeLoadErrorInput(value: SmartTableLoadError | string | null | undefined): SmartTableLoadError | null {
    if (value === null || value === undefined || value === '') {
        return null;
    }
    return typeof value === 'string' ? { message: value } : value;
}
