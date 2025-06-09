import { test, expect } from '../tests/fixtures/adBlocker';

test.describe('Modal Dialogs', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/modal-dialogs');
  });

  test('Small modal', async ({ page }) => {
    page.once('dialog', async alert => {
      expect(alert.message()).toBe('This is a small modal. It has very less content');
      await alert.accept();
    });
    await page.locator('#showSmallModal').click();
  });

  test('Large modal', async ({ page }) => {
    await page.locator('#showLargeModal').click();
    const largeModal = page.locator('.modal-content');

    await expect(largeModal).toBeVisible();
    await expect(largeModal).toContainText('Lorem Ipsum is simply dummy text');

    await page.locator('#closeLargeModal').click();
    await expect(largeModal).toHaveCount(0);
  });
});
