import { test, expect } from './fixtures/adBlocker';

test.describe('Menu', () => {
  test.skip(process.env.CI === 'true', 'Пропускается на CI');
  test.beforeEach(async ({ page }) => {
    await page.goto('/menu');
  });

  test('Menu - visual test', async ({ page }) => {
    const level_1 = page.getByText('Main Item 2', { exact: true });
    const level_2 = page.getByText('SUB SUB LIST »', { exact: true });
    const level_3 = page.getByText('Sub Sub Item 2', { exact: true });

    await level_1.hover();
    await level_2.hover();
    await level_3.hover();

    await expect(level_3).toHaveScreenshot('menu-level-3.png');
  });
});
