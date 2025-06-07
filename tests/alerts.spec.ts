import { test, expect } from '../tests/fixtures/adBlocker';

test.describe('Alerts', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/alerts');
  });

  test('Click Button to see alert', async ({ page }) => {
    page.once('dialog', async alert => {
      expect(alert.message()).toBe('You clicked a button');
      await alert.accept();
    });
    await page.locator('#alertButton').click();
  });

  test('On button click, alert will appear after 5 seconds', async ({ page }) => {
    const dialogPromise = page.waitForEvent('dialog', { timeout: 6000 });
    await page.locator('#timerAlertButton').click();
    const dialog = await dialogPromise;

    expect(dialog.message()).toBe('This alert appeared after 5 seconds');
    await dialog.accept();
  });

  test('On button click, confirm box will appear', async ({ page }) => {
    page.once('dialog', async dialog => {
      expect(dialog.message()).toBe('Do you confirm action?');
      await dialog.dismiss();
    });
    await page.locator('#confirmButton').click();

    await expect(page.locator('#confirmResult')).toContainText('You selected Cancel');
  });

  test('On button click, prompt box will appear', async ({ page }) => {
    const name = 'Dory';
    page.once('dialog', async dialog => {
      expect(dialog.message()).toBe('Please enter your name');
      await dialog.accept(name);
    });
    await page.locator('#promtButton').click();

    await expect(page.locator('#promptResult')).toContainText(`You entered ${name}`);
  });
});
