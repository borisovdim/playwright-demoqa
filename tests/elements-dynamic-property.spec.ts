import { test, expect } from '../tests/fixtures/adBlocker';

test.describe('Dynamic properties', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/dynamic-properties');
  });

  test('#1 Will enable in 5 seconds', async ({ page }) => {
    const button = page.locator('#enableAfter');
    await expect(button).toBeDisabled();
    await expect(button).toBeEnabled({ timeout: 5000 });
  });

  test('#2 Will enable in 5 seconds', async ({ page }) => {
    const button = page.locator('#enableAfter');
    await expect(button).toBeDisabled();

    await expect
      .poll(async () => await button.isEnabled(), {
        timeout: 6000,
        intervals: [300, 500],
      })
      .toBe(true);
  });

  test('№1 Color change', async ({ page }) => {
    const button = page.locator('#colorChange');
    await expect(button).toContainClass('text-danger', { timeout: 5000 });
  });

  test('№2 Color change', async ({ page }) => {
    const button = page.locator('#colorChange');

    await expect
      .poll(
        async () => {
          return await button.getAttribute('class');
        },
        { timeout: 6000 },
      )
      .toContain('text-danger');
  });

  test('#1 Visible After 5 Seconds', async ({ page }) => {
    const button = page.locator('#visibleAfter');
    await expect(button).toBeVisible({ timeout: 5000 });
  });

  test('#2 Visible After 5 Seconds', async ({ page }) => {
    const button = page.locator('#visibleAfter');
    await expect.poll(async () => await button.isVisible(), { timeout: 6000 }).toBe(true);
  });
});
