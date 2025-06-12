import { test, expect } from './fixtures/adBlocker';

test.describe('Tool Tips', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/tool-tips');
  });

  test('Button tool tips', async ({ page }) => {
    const toolTip = page.locator('.tooltip-inner');

    await page.getByRole('button', { name: 'Hover me to see' }).hover();
    await expect(toolTip).toHaveText('You hovered over the Button');
  });

  test('Input tool tips', async ({ page }) => {
    const toolTip = page.locator('.tooltip-inner');

    await page.getByPlaceholder('Hover me to see').hover();
    await expect(toolTip).toHaveText('You hovered over the text field');
  });

  test('Text tool tips', async ({ page }) => {
    const textContainer = page.locator('#texToolTopContainer');
    const toolTip = page.locator('.tooltip-inner');

    await textContainer.getByText('Contrary', { exact: true }).hover();
    await expect(toolTip).toHaveText('You hovered over the Contrary');

    await page.mouse.move(0, 0);
    await expect(toolTip).toBeHidden();

    await textContainer.getByText('1.10.32', { exact: true }).hover();
    await expect(toolTip).toHaveText('You hovered over the 1.10.32');
  });
});
