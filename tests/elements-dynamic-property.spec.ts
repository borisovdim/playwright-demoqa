import { expect, test } from '@playwright/test';

test.describe('Dynamic properties', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/dynamic-properties');
  });

  test('Will enable in 5 seconds', async ({ page }) => {
    const button = await page.locator('#enableAfter');
    await expect(button).toBeDisabled();
    await expect(button).toBeEnabled({ timeout: 5000 });
  });

  test('Color change', async ({ page }) => {
    const button = await page.locator('#colorChange');
    await expect(button).toContainClass('text-danger', { timeout: 5000 });
  });

  test('Visible After 5 Seconds', async ({ page }) => {
    const button = await page.locator('#visibleAfter');
    await expect(button).toBeVisible({ timeout: 5000 });
  });
});
