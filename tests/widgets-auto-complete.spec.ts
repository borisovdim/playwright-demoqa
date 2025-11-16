import { test, expect, Locator, Page } from './fixtures/adBlocker';

test.describe('Auto Complete', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/auto-complete');
  });

  test('Types multiple color names', async ({ page }) => {
    const colors = ['Red', 'Green', 'Blue'];
    const multiInput = page.locator('#autoCompleteMultipleContainer');

    for (const color of colors) {
      await fillInput({ page }, color, multiInput);
    }

    const values = await page.locator('.auto-complete__multi-value').all();

    for (const [index, value] of values.entries()) {
      await expect(value).toHaveText(colors[index]);
    }
  });

  test('Type single color name', async ({ page }) => {
    const colors = ['Indigo', 'Red', 'Yellow'];
    const singleInput = page.locator('#autoCompleteSingleContainer');
    const singleValue = page.locator('[class$="singleValue"]');

    for (const color of colors) {
      await fillInput({ page }, color, singleInput);
      await expect(singleValue).toHaveText(color);
    }
  });

  const fillInput = async ({ page }: { page: Page }, color: string, inputSelector: Locator) => {
    await inputSelector.click();
    await inputSelector.pressSequentially(color);
    await page.waitForTimeout(100);
    await inputSelector.press('Enter');
  };
});
