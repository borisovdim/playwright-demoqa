import { test, expect } from '@playwright/test';
import { existsSync, readdirSync, unlinkSync } from 'fs';
import { join } from 'path';

test.describe('Download', () => {
  const downloadFolder = join(__dirname, '../tests/downloads');

  test.beforeEach(async ({ page }) => {
    await page.goto('/upload-download');
  });

  test.afterEach(async ({ page }) => {
    const files = readdirSync(downloadFolder);
    for (const file of files) {
      unlinkSync(join(downloadFolder, file));
    }
  });

  test('Download file with default name', async ({ page }) => {
    const downloadEvent = page.waitForEvent('download');
    await page.locator('#downloadButton').click();
    const dowloadFile = await downloadEvent;
    const suggestedName = dowloadFile.suggestedFilename();
    const downloadPath = join(downloadFolder, suggestedName);
    await dowloadFile.saveAs(downloadPath);

    const fileExist = existsSync(downloadPath);
    expect(fileExist).toBeTruthy();
  });

  test('Download file with custom name', async ({ page }) => {
    const fileName = 'testFile.jpeg';
    const downloadPath = join(__dirname, 'downloads', fileName);
    const downloadEvent = page.waitForEvent('download');
    await page.locator('#downloadButton').click();
    const dowloadFile = await downloadEvent;
    await dowloadFile.saveAs(downloadPath);

    const fileExist = existsSync(downloadPath);
    expect(fileExist).toBeTruthy();
  });
});
