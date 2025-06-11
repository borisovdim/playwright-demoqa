import { test, expect } from './fixtures/adBlocker';

test.describe('Progress Bar', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/progress-bar');
  });

  test('Progress Bar', async ({ page }) => {
    const startStopButton = page.locator('#startStopButton');
    const resetButton = page.locator('#resetButton');
    const progressBar = page.getByRole('progressbar');

    await startStopButton.click();

    await page.waitForFunction(() => {
      const el = document.querySelector('[role="progressbar"]');
      return el?.getAttribute('aria-valuenow') === '39';
    });
    await startStopButton.click();

    const ariaValue = await progressBar.getAttribute('aria-valuenow');
    expect(ariaValue).toBe('39');
    await expect(progressBar).toHaveCSS('background-color', 'rgb(23, 162, 184)');

    await startStopButton.click();
    await page.waitForFunction(() => {
      const el = document.querySelector('[role="progressbar"]');
      return el?.getAttribute('aria-valuenow') === '100';
    });
    const ariaValueFull = await progressBar.getAttribute('aria-valuenow');
    expect(ariaValueFull).toBe('100');
    await expect(progressBar).toHaveCSS('background-color', 'rgb(40, 167, 69)');
    await page.waitForTimeout(1000);

    expect(startStopButton).not.toBeVisible();
    await resetButton.click();
    expect(resetButton).not.toBeVisible();

    await page.waitForFunction(() => {
      const el = document.querySelector('[role="progressbar"]');
      return el?.getAttribute('aria-valuenow') === '0';
    });
    const ariaValueEmpty = await progressBar.getAttribute('aria-valuenow');
    expect(ariaValueEmpty).toBe('0');
  });
});
