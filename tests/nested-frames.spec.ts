import { test, expect } from '../tests/fixtures/adBlocker';

test.describe('Nested Frames', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/nestedframes');
  });

  test('Get child frame', async ({ page }) => {
    const parentFrame = page.frameLocator('#frame1');
    const childFrame = parentFrame.frameLocator('iframe');

    await expect(parentFrame.locator('body')).toHaveText('Parent frame');
    await expect(childFrame.locator('body')).toHaveText('Child Iframe');
  });
});
