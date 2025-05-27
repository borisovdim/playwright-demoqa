import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
let data;

test.describe('Text Box', () => {
  test.beforeEach(async ({ page }) => {
    data = {
      userName: faker.person.fullName(),
      userEmail: faker.internet.email(),
      currentAddress: faker.location.streetAddress({ useFullAddress: true }),
      permanentAddress: faker.location.streetAddress({ useFullAddress: true }),
    };
    await page.goto('/text-box');
  });

  test('Fill text box and submit', async ({ page }) => {
    await page.locator('#userName').fill(data.userName);
    await page.locator('#userEmail').fill(data.userEmail);
    await page.locator('#currentAddress').fill(data.currentAddress);
    await page.locator('#permanentAddress').fill(data.permanentAddress);
    await page.getByRole('button', { name: 'Submit' }).click();

    const output = page.locator('#output');
    await expect.soft(output.locator('#name')).toContainText(`Name:${data.userName}`);
    await expect.soft(output.locator('#email')).toContainText(`Email:${data.userEmail}`);
    await expect.soft(output.locator('#currentAddress')).toContainText(`Current Address :${data.currentAddress}`);
    await expect
      .soft(output.locator('#permanentAddress'))
      .toContainText(`Permananet Address :${data.permanentAddress}`);
  });
});
