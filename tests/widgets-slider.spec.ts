import { test, expect, Locator, Page } from './fixtures/adBlocker';

let slider: Locator, sliderValue: Locator, tooltip: Locator;

test.describe('Slider', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/slider');
    slider = page.locator('input[type="range"]');
    sliderValue = page.locator('#sliderValue');
    tooltip = page.locator('[class*="tooltip__label"]');
  });

  test('Set slider value by JS', async () => {
    await setSliderValueByJS('2');
    await expect(sliderValue).toHaveValue('2');
  });

  test('Set slider value by mouse event', async ({ page }) => {
    await setSliderValueByMouseEvent({ page }, 57);
    await slider.hover();
    await expect(tooltip).toHaveText('57');
  });

  const setSliderValueByJS = async (value: string) => {
    await slider.evaluate((el, value) => {
      const input = el as HTMLInputElement;
      input.value = value;
      input.dispatchEvent(new Event('input', { bubbles: true }));
      input.dispatchEvent(new Event('change', { bubbles: true }));
      input.style.setProperty('--value', value);
    }, value);

    await sliderValue.evaluate((el, value) => {
      const input = el as HTMLInputElement;
      input.value = value;
    }, value);
  };

  const setSliderValueByMouseEvent = async ({ page }: { page: Page }, targetValue: number) => {
    const min = 0;
    const max = 100;
    const sliderElement = await slider.boundingBox();
    if (!sliderElement) {
      throw new Error('Slider was not found');
    }

    const ratio = (targetValue - min) / (max - min);
    const x = sliderElement.x + sliderElement.width * ratio;
    const y = sliderElement.y + sliderElement.height / 2;
    await page.mouse.click(x, y);
  };
});
