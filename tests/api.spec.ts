import { test, expect } from '@playwright/test';

test.describe('API Tests', () => {
  test('GET request to fetch user data', async ({ request }) => {
    // Perform a GET request to a sample API endpoint
    const response = await request.get('https://jsonplaceholder.typicode.com/users/1');

    // Assert the response status is 200
    expect(response.status()).toBe(200);

    // Parse the response body as JSON
    const responseBody = await response.json();

    // Assert the response contains expected data
    expect(responseBody).toHaveProperty('id', 1);
    expect(responseBody).toHaveProperty('name', 'Leanne Graham');
    expect(responseBody).toHaveProperty('email', 'Sincere@april.biz');
  });

  test('POST request to create a new resource', async ({ request }) => {
    // Perform a POST request to a sample API endpoint
    const response = await request.post('https://jsonplaceholder.typicode.com/posts', {
      data: {
        title: 'foo',
        body: 'bar',
        userId: 1,
      },
    });

    // Assert the response status is 201 (Created)
    expect(response.status()).toBe(201);

    // Parse the response body as JSON
    const responseBody = await response.json();

    // Assert the response contains the posted data
    expect(responseBody).toHaveProperty('title', 'foo');
    expect(responseBody).toHaveProperty('body', 'bar');
    expect(responseBody).toHaveProperty('userId', 1);
  });
});