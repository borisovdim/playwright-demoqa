import { test as base } from '@playwright/test';

export const test = base.extend({
  page: async ({ page }, use) => {
    await page.route('**/*', route => {
      const url = route.request().url();
      if (
        url.includes('googletagservices.com') ||
        url.includes('pagead2.googlesyndication.com') ||
        url.includes('serving.stat-rock.com')
      ) {
        route.abort();
      } else {
        route.continue();
      }
    });

    await use(page);
  },
});

export { expect, Page, Locator } from '@playwright/test';
