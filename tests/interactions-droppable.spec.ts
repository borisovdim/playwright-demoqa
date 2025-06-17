import { expect, test } from './fixtures/adBlocker';

test.describe('Droppable', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/droppable');
  });

  test('Simple', async ({ page }) => {
    await page.getByRole('tab', { name: 'Simple' }).click();

    const panel = page.locator('#droppableExample-tabpane-simple');
    const draggable = panel.locator('#draggable');
    const droppable = panel.locator('#droppable');

    await draggable.dragTo(droppable);
    await expect(droppable).toHaveCSS('background-color', 'rgb(70, 130, 180)');
  });

  test('Accept', async ({ page }) => {
    await page.getByRole('tab', { name: 'Accept' }).click();

    const panel = page.locator('#droppableExample-tabpane-accept');
    const acceptable = panel.locator('#acceptable');
    const notAcceptable = panel.locator('#notAcceptable');
    const droppable = panel.locator('#droppable');

    await notAcceptable.dragTo(droppable);
    await expect(droppable).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)');

    await acceptable.dragTo(droppable, { force: true });
    await expect(droppable).toHaveCSS('background-color', 'rgb(70, 130, 180)');
  });

  test('Prevent Propogation #1', async ({ page }) => {
    await page.getByRole('tab', { name: 'Prevent Propogation' }).click();

    const panel = page.locator('#droppableExample-tabpane-preventPropogation');
    const dragBox = panel.locator('#dragBox');
    const notGreedyDropBox = panel.locator('#notGreedyDropBox');
    const notGreedyInnerDropBox = panel.locator('#notGreedyInnerDropBox');

    const boxFrom = await dragBox.boundingBox();
    const boxTo = await notGreedyInnerDropBox.boundingBox();

    if (!boxFrom) throw new Error('boxFrom not found');
    if (!boxTo) throw new Error('boxTo not found');

    await page.mouse.move(boxFrom.x + boxFrom.width / 2, boxFrom.y + boxFrom.height / 2);
    await page.mouse.down();
    await page.mouse.move(boxTo.x + boxTo.width / 2, boxTo.y + boxTo.height / 2);

    await expect(notGreedyDropBox).toHaveCSS('background-color', 'rgb(143, 188, 143)');
    await expect(notGreedyInnerDropBox).toHaveCSS('background-color', 'rgb(143, 188, 143)');

    await page.mouse.up();

    await expect(notGreedyDropBox).toHaveCSS('background-color', 'rgb(70, 130, 180)');
    await expect(notGreedyInnerDropBox).toHaveCSS('background-color', 'rgb(70, 130, 180)');
  });

  test('Prevent Propogation #2', async ({ page }) => {
    await page.getByRole('tab', { name: 'Prevent Propogation' }).click();

    const panel = page.locator('#droppableExample-tabpane-preventPropogation');
    const dragBox = panel.locator('#dragBox');
    const greedyDropBox = panel.locator('#greedyDropBox');
    const greedyDropBoxInner = panel.locator('#greedyDropBoxInner');

    const boxFrom = await dragBox.boundingBox();
    const boxTo = await greedyDropBoxInner.boundingBox();

    if (!boxFrom) throw new Error('boxFrom not found');
    if (!boxTo) throw new Error('boxTo not found');

    await page.mouse.move(boxFrom.x + boxFrom.width / 2, boxFrom.y + boxFrom.height / 2);
    await page.mouse.down();
    await page.mouse.move(boxTo.x + boxTo.width / 2, boxTo.y + boxTo.height / 2);

    await expect(greedyDropBox).toHaveCSS('background-color', 'rgb(60, 179, 113)');
    await expect(greedyDropBoxInner).toHaveCSS('background-color', 'rgb(143, 188, 143)');

    await page.mouse.up();

    await expect(greedyDropBox).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)');
    await expect(greedyDropBoxInner).toHaveCSS('background-color', 'rgb(70, 130, 180)');
  });
});
