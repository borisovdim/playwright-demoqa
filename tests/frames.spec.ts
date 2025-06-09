import { test, expect } from '../tests/fixtures/adBlocker';

test.describe('Alerts', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/frames');
  });

  test('Big frame', async ({ page }) => {
    const myFrame = page.frameLocator('#frame1');

    await expect(page.locator('#frame1')).toHaveAttribute('width', '500px');
    await expect(page.locator('#frame1')).toHaveAttribute('height', '350px');
    await expect(myFrame.locator('#sampleHeading')).toHaveText('This is a sample page');
  });

  test('Small frame', async ({ page }) => {
    const myFrame = page.frameLocator('#frame2');

    await expect(page.locator('#frame2')).toHaveAttribute('width', '100px');
    await expect(page.locator('#frame2')).toHaveAttribute('height', '100px');
    await expect(myFrame.locator('#sampleHeading')).toHaveText('This is a sample page');
  });

  test('Custom frame', async ({ page }) => {
    const frameElement = page.locator('#frame2');
    const myFrame = page.frameLocator('#frame2');
    
    // set new attributes value
    await frameElement.evaluate(el => {
      el.setAttribute('width', '753px');
      el.setAttribute('height', '521px');
    });
    await myFrame.locator('#sampleHeading').evaluate(el => {
      el.textContent = 'You are in a new custom frame';
    });

    await expect(page.locator('#frame2')).toHaveAttribute('width', '753px');
    await expect(page.locator('#frame2')).toHaveAttribute('height', '521px');
    await expect(myFrame.locator('#sampleHeading')).toHaveText('You are in a new custom frame');
  });
});
