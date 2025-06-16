import { expect, test } from './fixtures/adBlocker';

test.describe('Selectable', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/selectable');
  });

  test('Select elements', async ({ page }) => {
    const items = ['Three', 'Five', 'Seven'];

    await page.locator('#demo-tab-grid').click();

    for (const item of items) {
      await selectItem({ page }, item);
    }

    for (const item of items) {
      const element = await getItem({ page }, item);
      await expect(element).toHaveClass(/.*\bactive\b.*/);
    }
  });

  const selectItem = async ({ page }, element: string) => {
    const panel = page.locator('#demo-tabpane-grid');
    await panel.locator('.list-group-item', { hasText: element }).click();
  };

  const getItem = async ({ page }, element: string) => {
    const panel = page.locator('#demo-tabpane-grid');
    return await panel.locator('.list-group-item', { hasText: element });
  };
});
