import { expect, test } from './fixtures/adBlocker';

test.describe('Resizable', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/resizable');
  });

  test('Resize box', async ({ page }) => {
    const resizableElement = page.locator('#resizableBoxWithRestriction .react-resizable-handle');

    const box = await resizableElement.boundingBox();
    if (!box) throw new Error('resizableElement not found');

    const start_X = box.x + box.width - 1;
    const start_Y = box.y + box.height - 1;

    await page.mouse.move(start_X, start_Y);
    await page.mouse.down();
    await page.mouse.move(start_X + 150, start_Y + 75);
    await page.mouse.up();

    const resized = page.locator('#resizableBoxWithRestriction');
    const newSize = await resized.boundingBox();
    expect(newSize?.width).toBe(350);
    expect(newSize?.height).toBe(275);
  });

    test('Minimize box', async ({ page }) => {
    const resizableElement = page.locator('#resizable .react-resizable-handle');

    await resizableElement.scrollIntoViewIfNeeded()

    const box = await resizableElement.boundingBox();
    if (!box) throw new Error('resizableElement not found');

    const start_X = box.x + box.width - 1;
    const start_Y = box.y + box.height - 1;

    await page.mouse.move(start_X, start_Y);
    await page.mouse.down();
    await page.mouse.move(start_X - 180, start_Y - 180);
    await page.mouse.up();

    const resized = page.locator('#resizable');
    const newSize = await resized.boundingBox();
    expect(newSize?.width).toBe(20);
    expect(newSize?.height).toBe(20);
  });
});
