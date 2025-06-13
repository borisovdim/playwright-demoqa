import { expect, test } from '../tests/fixtures/adBlocker';

test.describe('Sortable', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/sortable');
  });

test('Small modal', async ({ page }) => {
  const sourceArr = ['One', 'Two', 'Three', 'Four', 'Five'];

  for (const element of sourceArr) {
    await dragToItem({ page }, element);
  }

  sourceArr.push('Six');
  const reversedArr = [...sourceArr].reverse();

  const listItems = await page.locator('#demo-tabpane-list .list-group-item').all();

  for (const [index, expectedText] of reversedArr.entries()) {
    const actualText = await listItems[index].textContent();
    expect(actualText).toBe(expectedText);
  }
});

const dragToItem = async ({ page }, element: string) => {
  const panel = page.locator('#demo-tabpane-list');
  const source = panel.locator('.list-group-item', { hasText: element });
  const target = panel.locator('.list-group-item', { hasText: 'Six' });

  await source.dragTo(target);
};
});
