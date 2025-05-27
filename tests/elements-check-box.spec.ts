import { test, expect } from '@playwright/test';

test.describe('Check Box', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/checkbox');
  });

  test('Message for selected check boxes', async ({ page }) => {
    await page.locator('[title="Expand all"]').click();
    await page.locator('[for="tree-node-notes"]').click();
    await page.locator('[for="tree-node-react"]').click();
    await page.locator('[for="tree-node-downloads"]').click();

    const result = page.locator('#result');
    const messages = ['notes', 'react', 'downloads', 'wordFile', 'excelFile'];
    for (const message of messages) {
      await expect(result).toContainText(message);
    }
  });

  test('Check boxes checked - unchecked', async ({ page }) => {
    await page.locator('[for="tree-node-home"]').click();
    await page.getByRole('button', { name: 'Toggle' }).first().click();
    const checkboxesChecked = await page.locator('input[type="checkbox"]').all();

    for (const checkbox of checkboxesChecked) {
      await expect(checkbox).toBeChecked();
    }
    await page.locator('[for="tree-node-home"]').click();
    const checkboxesUnChecked = await page.locator('input[type="checkbox"]').all();
    for (const checkbox of checkboxesUnChecked) {
      await expect(checkbox).not.toBeChecked();
    }
  });
});
