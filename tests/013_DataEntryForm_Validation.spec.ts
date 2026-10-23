import {test,expect} from '@playwright/test'

test.describe('Data Entry Form Validations: Additional Verifications',  ()=>
{
    const pageURL='https://sdetqa.vercel.app/autoplay';
    test.beforeEach(async({page})=>
    {
        await page.goto(pageURL);
        const pageLogo=  page.getByText('AutoPlay',{exact : true});
        await expect(pageLogo).toBeVisible();
    })


    //5. Submit Button Validation
    test('5. Submit Button Validation', async({page})=>
    {
        //Locate Submit button--> Button should be visible
        const submitBtn= page.getByRole('button',{name:'Submit'}).first();
        await expect(submitBtn).toBeVisible();

        //Click on Submit button--> Button should be clickable
        await submitBtn.click();

        //Verify button state--> Button should remain enabled
        await expect(submitBtn).toBeEnabled();
       
    })

    //6. Additional (Recommended) Test Cases

    //Leave all fields empty and click Submit--> Validation message should appear (if implemented
      test('Empty form submission should show validation message', async ({ page }) => {
        const nameField = page.getByLabel('Full name');
        const emailField = page.getByLabel('Email');
        const phoneField = page.getByLabel('Phone');
        const addressField = page.getByLabel('Address');
        const submitButton = page.getByRole('button', { name: 'Submit' }).first();
        const errorMessage = page.locator('#formErrors');
    
        await nameField.fill('');
        await emailField.fill('');
        await phoneField.fill('');
        await addressField.fill('');
    
        const submitBtn= page.getByRole('button',{name:'Submit'}).first();
        await expect(submitBtn).toBeVisible();
        await submitBtn.click();

        const submitBtnErrorMsg=await page.locator('#formErrors').innerText();
        console.log(submitBtnErrorMsg); 
        const ErrorMsg="Please fix the following:\nFull name is required.\nEmail is required.\nPhone is required.\nAddress is required.\nPlease select a gender.\nPlease select at least one day."
        await expect(submitBtnErrorMsg).toContain(ErrorMsg);
    })


    //Enter invalid email format -->Error should be shown
    test('Invalid email format should show an error', async({page})=>
    {
        const emailField= await page.getByLabel('Email');
        await expect(emailField).toBeVisible();

        const invalidEmail="abc.xyz"
        await emailField.fill(invalidEmail);

        const submitBtn= page.getByRole('button',{name:'Submit'}).first();
        await submitBtn.click();

        const submitBtnErrorMsg=await page.locator('#formErrors').innerText();
        const emailFieldErrorMessage="Please fix the following:\nPlease enter a valid email address.\nPlease select a gender.\nPlease select at least one day."
        await expect(submitBtnErrorMsg).toContain(emailFieldErrorMessage);


    })

    //Enter more than 15 chars in name -->Input should be restricted
    test('Full name input should restrict more than 15 characters', async({page})=>
    {
     
        const nameField = page.getByLabel('Full name');
        await expect(nameField).toBeVisible();

        const nameFieldExceededData="abcd123efghij344klmnop";
        const exceptedData="abcd123efghij34";

        await nameField.fill(nameFieldExceededData);
        await expect(nameField).toHaveValue(exceptedData);
        await expect(nameField).toHaveValue(/.{15}/) // checks number of characters

    })

    //Enter alphabets in phone field -->Should be restricted (if validation exists)
    test('Phone input should restrict alphabet characters', async ({ page }) => 
    {

        const phoneField = page.getByLabel('Phone');
        await phoneField.fill('123ABC456def789');
        await expect(phoneField).toHaveValue(/^[^A-Za-z]*$/); //maching with 123456789

    });

})