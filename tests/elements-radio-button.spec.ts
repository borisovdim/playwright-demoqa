import { test, expect, Locator } from '../tests/fixtures/adBlocker';

let yesRadioBtn: Locator;
let impressiveRadioBtn: Locator;
let noRadioBtn: Locator;

test.describe('Radio Button', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/radio-button');

    yesRadioBtn = page.locator('label[for="yesRadio"]');
    impressiveRadioBtn = page.locator('label[for="impressiveRadio"]');
    noRadioBtn = page.locator('label[for="noRadio"]');
  });

  test('Radio button default access', async ({ page }) => {
    await expect(yesRadioBtn).toBeEnabled();
    await expect(impressiveRadioBtn).toBeEnabled();
    await expect(noRadioBtn).toBeDisabled();
  });

  test('Select Yes radio button', async ({ page }) => {
    await expect(yesRadioBtn).toBeVisible();
    await yesRadioBtn.click();

    await expect(yesRadioBtn).toBeChecked();
    await expect(impressiveRadioBtn).not.toBeChecked();
    await expect(noRadioBtn).not.toBeChecked();
    await expect(page.locator('.text-success')).toContainText(/yes/i);
  });

  test('Select Impressive radio button', async ({ page }) => {
    await expect(impressiveRadioBtn).toBeVisible();
    await impressiveRadioBtn.click();

    await expect(impressiveRadioBtn).toBeChecked();
    await expect(yesRadioBtn).not.toBeChecked();
    await expect(noRadioBtn).not.toBeChecked();
    await expect(page.locator('.text-success')).toContainText(/impressive/i);
  });
});
