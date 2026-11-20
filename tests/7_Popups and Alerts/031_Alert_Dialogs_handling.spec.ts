import{test,expect} from '@playwright/test'

test.describe("Handling Dialogs",()=>{

test.beforeEach('Navigate to the File Upload page', async ({ page }) =>
 {
    await page.goto("https://sdetqa.vercel.app/autoplay.html");
    await expect(page.getByText('AutoPlay')).toBeVisible();
});


test("Handling Simple Alert",async({page})=>
{
 
    page.on("dialog", (dialog)=>
    {
        expect(dialog.type()).toBe('alert');
        expect(dialog.message()).toContain('Simple alert!');
        dialog.accept();
    })

    await page.getByRole('button', { name: 'Simple' }).click();
})

test('confirmation dialog', async ({ page }) => {
        page.on('dialog', (dialog) => {
            expect(dialog.type()).toBe('confirm')
            expect(dialog.message()).toContain("Confirm?")
            dialog.dismiss()    //dialog.accept()
        });
        await page.getByRole('button', { name: 'Confirm' }).click()
    })


    test('prompt dialog', async ({ page }) => {
        page.on('dialog', (dialog) => {
            if (dialog.type() === "prompt") {
                dialog.accept("Welcome")
            }
            else if (dialog.type() === 'alert') {
                dialog.accept()
            }
        });
        await page.getByRole('button', { name: 'Prompt' }).click()
    })




}
)