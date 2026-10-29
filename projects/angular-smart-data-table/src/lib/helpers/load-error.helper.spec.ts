import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { normalizeLoadErrorInput, toSmartTableLoadError } from './load-error.helper';

describe('toSmartTableLoadError', () => {
  it('reads the first error message, its code and the request id from an API error body', () => {
    const error = new HttpErrorResponse({
      status: 422,
      error: {
        errors: [
          { code: 'PERIOD_CLOSED', message: 'The billing period is closed.', field: 'periodId' },
          { code: 'OTHER', message: 'Second error' },
        ],
        requestId: 'req_123',
      },
    });

    const result = toSmartTableLoadError(error);

    expect(result.message).toBe('The billing period is closed.');
    expect(result.code).toBe('PERIOD_CLOSED');
    expect(result.requestId).toBe('req_123');
    expect(result.status).toBe(422);
    expect(result.errors?.length).toBe(2);
    expect(result.cause).toBe(error);
  });

  it('takes the request id from the X-Request-Id header when the body has none', () => {
    const error = new HttpErrorResponse({
      status: 500,
      error: { errors: [{ code: 'INTERNAL', message: 'Unexpected error' }] },
      headers: new HttpHeaders({ 'X-Request-Id': 'hdr_456' }),
    });

    expect(toSmartTableLoadError(error).requestId).toBe('hdr_456');
  });

  it('parses a JSON error body that arrived as text', () => {
    const error = new HttpErrorResponse({
      status: 400,
      error: JSON.stringify({ errors: [{ code: 'BAD', message: 'Bad filter' }], requestId: 'req_9' }),
    });

    const result = toSmartTableLoadError(error);

    expect(result.message).toBe('Bad filter');
    expect(result.requestId).toBe('req_9');
  });

  it('leaves the message empty for network errors, so the fallback text is shown', () => {
    const error = new HttpErrorResponse({ status: 0, error: new ProgressEvent('error') });

    const result = toSmartTableLoadError(error);

    expect(result.message).toBeFalsy();
    expect(result.status).toBe(0);
  });

  it('accepts a plain message, a { message } object and a runtime Error', () => {
    expect(toSmartTableLoadError('Could not load units').message).toBe('Could not load units');
    expect(toSmartTableLoadError({ message: 'Custom', requestId: 'r1' })).toEqual(
      jasmine.objectContaining({ message: 'Custom', requestId: 'r1' }),
    );
    expect(toSmartTableLoadError(new TypeError('x is undefined')).message).toBeFalsy();
  });
});

describe('normalizeLoadErrorInput', () => {
  it('maps empty values to null and strings to { message }', () => {
    expect(normalizeLoadErrorInput(null)).toBeNull();
    expect(normalizeLoadErrorInput(undefined)).toBeNull();
    expect(normalizeLoadErrorInput('')).toBeNull();
    expect(normalizeLoadErrorInput('Oops')).toEqual({ message: 'Oops' });

    const error = { message: 'Kept', requestId: 'r2' };
    expect(normalizeLoadErrorInput(error)).toBe(error);
  });
});
