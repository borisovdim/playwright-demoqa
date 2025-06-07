import { faker } from '@faker-js/faker';
import { test, expect, Page } from '../tests/fixtures/adBlocker';
import { join } from 'path';

test.describe('Practice Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('automation-practice-form');
  });

  test('Required fields', async ({ page }) => {
    const firstName = page.getByPlaceholder('First Name');
    const lastName = page.getByPlaceholder('Last Name');
    const mobileNumber = page.getByPlaceholder('Mobile Number');
    const radioButtons = page.locator('label[for^="gender-radio"]').all();

    await page.getByRole('button', { name: 'Submit' }).click();

    await expect(firstName).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    await expect(lastName).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    await expect(mobileNumber).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    for (const radioButton of await radioButtons) {
      await expect(radioButton).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    }
  });

  test('Fill forma', async ({ page }) => {
    // prepare data
    const fileName = 'sampleFile.jpeg';
    const filePath = join(__dirname, '../tests/uploads', fileName);
    const data = {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      mobileNumber: faker.string.numeric({ length: 10 }),
      dateOfBirt: faker.date.birthdate({ min: 18, max: 65, mode: 'age' }),
      subject: 'Maths',
      currentAddress: faker.location.streetAddress({ useFullAddress: true }),
    };
    // get elements
    const firstName = page.locator('#firstName');
    const lastName = page.locator('#lastName');
    const email = page.locator('#userEmail');
    const genderRadioButton = page.locator('label[for^="gender-radio-1"]');
    const mobileNumber = page.locator('#userNumber');
    const dateOfBirt = page.locator('#dateOfBirthInput');
    const subjects = page.locator('#subjectsInput');
    const hobbyCheckbox = page.getByText('Music');
    // const hobbyCheckbox = page.locator('label[for="hobbies-checkbox-3"]');
    const uploadPictureButton = page.locator('#uploadPicture');
    const currentAddress = page.locator('#currentAddress');
    const state = page.locator('#state');
    const city = page.locator('#city');
    // fill forma
    await firstName.fill(data.firstName);
    await lastName.fill(data.lastName);
    await email.fill(data.email);
    await genderRadioButton.click();
    await mobileNumber.fill(data.mobileNumber);

    await dateOfBirt.click();
    await dateOfBirt.fill(dataFormatter(data.dateOfBirt, 'short'));
    await dateOfBirt.press('Enter');

    await subjects.click();
    await page.waitForTimeout(500);
    await subjects.fill('Mat');
    await page.waitForTimeout(500);
    await subjects.press('Enter');
    await page.waitForTimeout(500);

    await hobbyCheckbox.click(); //Music
    await expect(hobbyCheckbox).toBeChecked();

    await currentAddress.fill(data.currentAddress);
    await expect(currentAddress).toHaveValue(data.currentAddress);

    await expect(state).toBeVisible();
    await state.click();
    await page.getByText('NCR', { exact: true }).click();
    await expect(state).toContainText('NCR');

    await expect(city).toBeVisible();
    await city.click();
    await page.getByText('Delhi', { exact: true }).click();
    await expect(city).toContainText('Delhi');

    await uploadPictureButton.setInputFiles(filePath);

    await page.getByRole('button', { name: 'Submit' }).click();
    // check result
    expect.soft(await getTableValueByLabel('Student Name', page)).toBe(`${data.firstName} ${data.lastName}`);
    expect.soft(await getTableValueByLabel('Student Email', page)).toBe(data.email);
    expect.soft(await getTableValueByLabel('Gender', page)).toBe('Male');
    expect.soft(await getTableValueByLabel('Mobile', page)).toBe(data.mobileNumber);
    expect.soft(await getTableValueByLabel('Date of Birth', page)).toBe(dataFormatter(data.dateOfBirt, 'long'));
    // expect.soft(await getTableValueByLabel('Subjects', page)).toBe(data.subject);
    expect.soft(await getTableValueByLabel('Hobbies', page)).toBe('Music');
    expect.soft(await getTableValueByLabel('Picture', page)).toBe(fileName);
    expect.soft(await getTableValueByLabel('Address', page)).toBe(data.currentAddress);
    expect.soft(await getTableValueByLabel('State and City', page)).toBe('NCR Delhi');
  });
});

const dataFormatter = (date: Date, monthFormat: string): string => {
  const day = date.getDate().toString().padStart(2, '0');
  const month = date.toLocaleString('en-GB', { month: monthFormat });
  const year = date.getFullYear();
  switch (monthFormat) {
    case 'short':
      return `${day} ${month} ${year}`;
    case 'long':
      return `${day} ${month},${year}`;
  }
};

const getTableValueByLabel = async (label: string, page: Page): Promise<string | null> => {
  return await page.locator(`tr:has(td:text('${label}')) >> td:nth-of-type(2)`).textContent();
};
