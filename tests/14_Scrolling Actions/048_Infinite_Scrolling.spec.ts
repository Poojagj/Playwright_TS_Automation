
import { test, expect } from '@playwright/test';

test('Select Item 200 from dropdown', async ({ page }) => {

    // 1. Open the application
    await page.goto('https://sdetqa.vercel.app/autoplay.html');

    // 2. Locate the dropdown
    const dropdown = page.locator('#scrollable');

    // 3. Keep scrolling until Item 200 is available
    await dropdown.evaluate(async (select) => {

        while (true) {

            // Check whether Item 200 is available
            const itemFound = Array.from(select.options)
                .some(option => option.text === 'Item 200');

            if (itemFound) {
                break;
            }

            // Scroll to the bottom to load more items
            select.scrollTop = select.scrollHeight;

            // Wait for new items to load
            await new Promise(resolve => setTimeout(resolve, 100));
        }

    });

    // 4. Select Item 200
    await dropdown.selectOption({ label: 'Item 200' });

    // 5. Verify the selected value
    await expect(dropdown).toHaveValue('Item 200');

    await page.waitForTimeout(5000);

    await page.close();

});
