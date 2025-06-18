import { expect, test } from './fixtures/adBlocker';

test.describe('Dragabble', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/dragabble');
  });

  test('Simple', async ({ page }) => {
    await page.getByRole('tab', { name: 'Simple' }).click();

    const panel = page.locator('#draggableExample-tabpane-simple');
    const dragBox = panel.locator('#dragBox');

    const box = await dragBox.boundingBox();
    if (!box) throw new Error('box not found');

    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await page.mouse.down();
    await page.mouse.move(box.x + 100, box.y + 45);
    await page.mouse.up();

    const style = await dragBox.getAttribute('style');
    expect(style).toContain('left: 50px');
    expect(style).toContain('top: 25px');
  });

  test('Container Restricted', async ({ page }) => {
    test.setTimeout(30000);
    await page.getByRole('tab', { name: 'Container Restricted' }).click();

    const parent = page.locator('.draggable.m-3');
    const dragText = parent.locator('.ui-draggable');

    const box = await dragText.boundingBox();
    if (!box) throw new Error('box not found');

    await parent.scrollIntoViewIfNeeded();

    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await page.mouse.down();
    await page.mouse.move(box.x + box.width / 2, box.y + 50);
    await page.mouse.up();

    await expect
      .poll(async () => await dragText.getAttribute('style'), { timeout: 10000, intervals: [200, 500] })
      .toContain('top: 28px');

    const style = await dragText.getAttribute('style');
    expect(style).toContain('left: 0px');
    expect(style).toContain('top: 28px');
  });
});
