import { test, expect } from '../tests/fixtures/adBlocker';

test.describe('Browser Windows', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/browser-windows');
  });

  test('Open new tab', async ({ page, context }) => {
    const pagePromise = context.waitForEvent('page');
    await page.locator('#tabButton').click();
    const newTab = await pagePromise;

    await expect(newTab.locator('#sampleHeading')).toContainText('This is a sample page');
  });

  test('Open new window', async ({ page, context }) => {
    const pagePromise = context.waitForEvent('page');
    await page.locator('#windowButton').click();
    const newWindow = await pagePromise;

    await expect(newWindow.locator('#sampleHeading')).toContainText('This is a sample page');
  });

  test('Open new window message', async ({ page, context }) => {
    const pagePromise = context.waitForEvent('page');
    await page.locator('#messageWindowButton').click();
    const newWindow = await pagePromise;

    await expect(newWindow.locator('body')).toContainText('Knowledge increases by sharing');
  });
});
