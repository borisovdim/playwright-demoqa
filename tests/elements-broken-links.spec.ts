import { test, expect } from '@playwright/test';

test.describe.only('Broken Links - Images', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/broken');
  });

  test('Example #1 - Broken link navigates to 500 error page', async ({ page }) => {
    const [response] = await Promise.all([
      page.waitForNavigation(),
      page.getByRole('link', { name: 'Click Here for Broken Link' }).click(),
    ]);
    expect(response?.status()).toBe(500);
  });

    test('Example #2 - Broken link navigates to 500 error page', async ({ page }) => {
    let resp;
    page.on('response', response => {
      if (response.request().method() === 'GET' && response.url().includes('/status_codes/500')) {
        resp = response;
      }
    });
    await page.getByRole('link', { name: 'Click Here for Broken Link' }).click();
    await page.waitForLoadState('domcontentloaded');
    expect(resp.status()).toBe(500);
  });

  test('Valid link navigates to correct page', async ({ page }) => {
    const [response] = await Promise.all([
      page.waitForNavigation(),
      page.getByRole('link', { name: 'Click Here for Valid Link' }).click(),
    ]);
    expect(response?.status()).toBe(200);
    expect(page.url()).toBe('https://demoqa.com/');
  });
});
