// Import the function to test
import { doFetch } from '../src/js/modules/network-proxy';

// Define the test suite using the describe function
describe('doFetch function', () => {
  // Define a test case using the test function
  test('should fetch data from the API', async () => {
    // Use Jest's mocking function to mock the fetch method
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ data: 'test data' }),
      })
    );

    // Call the function to test and expect it to return the correct data
    const url = 'www.google.fi';
    const data = await doFetch(url);
    expect(data).toEqual({ data: 'test data' });

    // Expect the fetch method to have been called with the correct URL and options
    expect(global.fetch).toHaveBeenCalledWith(url, undefined);

    // Clean up the mock after the test has run
    global.fetch.mockClear();
    delete global.fetch;
  });

  // Define another test case to test the error handling
  test('should handle fetch errors and retry with allorigins proxy', async () => {
    // Use Jest's mocking function to mock the fetch method and simulate an HTTP error
    global.fetch = jest.fn(() => Promise.reject(new Error('http error, code: 500')));

    // Call the function to test and expect it to throw an error
    const url = 'http://example.com/data';
    await expect(doFetch(url)).rejects.toThrow('doFetch failed: http error, code: 500');

    // Expect the fetch method to have been called with the correct URL and options
    expect(global.fetch).toHaveBeenCalledWith(url, undefined);

    // Expect the fetch method to have been called again with the allorigins proxy URL
    const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}&rand=`;
    expect(global.fetch).toHaveBeenCalledWith(proxyUrl + expect.any(Number), undefined);

    // Clean up the mock after the test has run
    global.fetch.mockClear();
    delete global.fetch;
  });
});
