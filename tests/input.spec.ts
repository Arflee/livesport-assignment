import { test, expect } from '@playwright/test';

test.describe('Input Component', () => {
  test('renders UI elements with initial query', async ({ page }) => {
    await page.goto('http://localhost:3000/');

    const wrapper = page.locator('div.relative.w-full.max-w-md.mx-auto');
    await expect(wrapper).toHaveCount(1);

    const svg = wrapper.locator('svg[aria-hidden="true"]');
    await expect(svg).toHaveCount(1);

    const input = page.locator('input');
    await expect(input).toHaveClass(/border-1/);
    await expect(input).toHaveClass(/rounded-md/);
    await expect(input).toHaveAttribute('placeholder', 'Search');
    await expect(input).toHaveValue('');
  });

  test('updates URL with debounce on typing', async ({ page }) => {
    await page.goto('http://localhost:3000/');

    const input = page.locator('input');
    await input.fill('hello');

    // Wait for debounce
    await page.waitForTimeout(500);

    // Expect URL to include page=1&query=hello
    await expect(page).toHaveURL(/.*page=1&query=hello$/);
  });

  test('removes query param when input is cleared', async ({ page }) => {
    await page.goto('http://localhost:3000/?query=initial');

    const input = page.locator('input');
    await input.fill('');

    //Wait for debounce
    await page.waitForTimeout(500);

    await expect(page).toHaveURL(/.*page=1$/);
  });
});