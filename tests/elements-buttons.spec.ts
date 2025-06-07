import { test, expect } from '../tests/fixtures/adBlocker';

test.describe('Buttons', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/buttons');
  });

  test('Double Click Me', async ({ page }) => {
    await page.getByRole('button', { name: 'Double Click Me' }).dblclick();
    const messageArea = page.locator('#doubleClickMessage');
    await expect(messageArea).toContainText('You have done a double click');
  });

  test('Right Click Me', async ({ page }) => {
    await page.getByRole('button', { name: 'Right Click Me' }).click({ button: 'right' });
    const messageArea = page.locator('#rightClickMessage');
    await expect(messageArea).toContainText('You have done a right click');
  });

  test('Click Me', async ({ page }) => {
    await page.getByRole('button', { name: 'Click Me', exact: true }).click();
    const messageArea = page.locator('#dynamicClickMessage');
    await expect(messageArea).toContainText('You have done a dynamic click');
  });
});
