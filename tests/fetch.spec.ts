import { fetchEntities } from '@/lib/utils';
import { test, expect } from '@playwright/test';

test.describe('fetchEntities', () => {
    let originalFetch: typeof global.fetch;

    test.beforeEach(() => {
        originalFetch = global.fetch;
    });

    test.afterEach(() => {
        global.fetch = originalFetch;
    });

    test('returns JSON data when status is 200', async () => {
        const mockData = [
            { id: 1, name: 'Entity One' },
            { id: 2, name: 'Entity Two' },
        ];

        // Stub fetch
        global.fetch = async () => ({
            status: 200,
            json: async () => mockData,
        } as never);

        const result = await fetchEntities('test');
        expect(result).toEqual(mockData);
    });

    test('returns errorMessage and code when status is 422', async () => {
        global.fetch = async () => ({ status: 422 } as never);

        const result = await fetchEntities('a');
        expect(result).toEqual({
            errorMessage: 'The search string is too short! Try something else.',
            code: 422,
        });
    });

    test('returns developer error when status is 400', async () => {
        global.fetch = async () => ({ status: 400 } as never);

        const result = await fetchEntities('bad');
        expect(result).toEqual({
            errorMessage: "The developer wrote bad fetch string. It's not your fault",
            code: 400,
        });
    });

    test('returns generic error for other statuses', async () => {
        global.fetch = async () => ({ status: 500 } as never);

        const result = await fetchEntities('error');
        expect(result).toEqual({
            errorMessage: "Oi! Oi! Something bad has happened. Try again...maybe.",
            code: 500,
        });
    });

    test('throws on network failure', async () => {
        global.fetch = async () => { throw new Error('Network Error'); };
        await expect(fetchEntities('fail')).rejects.toThrow('Network Error');
    });
}); 