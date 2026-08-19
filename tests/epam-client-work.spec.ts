import { test, expect } from '@playwright/test';

test.describe('EPAM client work navigation', () => {
  test('opens Services and verifies Client Work page', async ({ page }) => {
    await page.goto('https://www.epam.com/', { waitUntil: 'networkidle' });

    const acceptAll = page.getByRole('button', { name: 'Accept All' });
    if (await acceptAll.isVisible().catch(() => false)) {
      await acceptAll.click({ timeout: 3000 }).catch(() => {});
    }

    const servicesLink = page.getByRole('link', { name: /^Services$/ }).first();
    await servicesLink.evaluate((el) => el.scrollIntoView({ block: 'center' }));
    await servicesLink.evaluate((el) => el.click());

    const exploreClientWork = page.getByRole('link', { name: /Explore Our Client Work/i }).first();
    await exploreClientWork.evaluate((el) => el.scrollIntoView({ block: 'center' }));
    await exploreClientWork.evaluate((el) => el.click());

    await expect(page).toHaveURL(/\/services\/client-work$/);
    await expect(page.getByText('Client Work', { exact: false })).toBeVisible();
  });
});
