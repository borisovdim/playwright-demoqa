import { expect, test } from '@playwright/test';
import { join } from 'path';

test.describe('Upload', () => {
  const fileName = 'dummy_file.txt';
  const filePath = join(__dirname, '../tests/uploads', fileName);

  test.beforeEach(async ({ page }) => {
    await page.goto('/upload-download');
  });

  test('Upload a file', async ({ page }) => {
    await page.locator('#uploadFile').click();
    await page.locator('#uploadFile').setInputFiles(filePath);
    await expect(page.locator('#uploadedFilePath')).toContainText('C:\\fakepath\\dummy_file.txt');
  });
});
