import {test,expect} from '@playwright/test'

const pageURL='https://sdetqa.vercel.app/autoplay'

test.describe('Data Entry Form Test Validations', ()=>
{

test.beforeEach(async({page})=>
{
    await page.goto(pageURL);
    const pageLogo=  page.getByText('AutoPlay',{exact : true});
    await expect(pageLogo).toBeVisible();
})

//1.Page Load Validation
test('1.Page Load Validation', async({page})=>
{
    await expect(page).toHaveURL(pageURL);
    const pageLogo=  page.getByText('AutoPlay',{exact : true});
    await expect(pageLogo).toBeVisible();
})

//2. Input Fields Validation
test('2. Input Fields Validation',async({page})=>
{
     const nameField= page.getByLabel('Full name',{exact:true});
     const emailField= page.getByLabel('Email',{exact:true});
     const phoneField= page.getByLabel('Phone',{exact:true});
     const addressField= page.getByLabel('Address',{exact:true});

    
     //Locate Full name field --->Field should be visible & enabled
    await expect(nameField).toBeVisible();
    await expect(nameField).toBeEnabled();

    //Check maxlength attribute of Full name -->Max length should be 15
    await expect(nameField).toHaveAttribute('maxlength','15')

    //Enter "John Canedy" in Full name --> Value should be entered correctly
    await nameField.fill('John Canedy');
    await expect(nameField).toHaveValue('John Canedy');

    //Locate Email field --> Field should be visible
    await expect(emailField).toBeVisible();
    await expect(emailField).toBeEnabled();

    //Enter "tester@example.com" -->Value should match input
    await emailField.fill("tester@example.com");
    await expect(emailField).toHaveValue("tester@example.com");

    //Locate Phone field -->Field should be visible
    await expect(phoneField).toBeVisible();
    await expect(phoneField).toBeEnabled();

    //Enter "+91 1234567898" Value should match input
    await phoneField.fill("+91 1234567898");
    await expect(phoneField).toHaveValue("+91 1234567898");

    //Locate Address field -->Field should be visible
    await expect(addressField).toBeVisible();
    await expect(phoneField).toBeEnabled();

    //Enter multi-line address --> Value should accept newline input

    await addressField.fill("123 XYZ \n state country");
    await expect(addressField).toHaveValue("123 XYZ \n state country");

})

 // 3. Radio Button (Gender) Validation
  test('3. Radio Button (Gender) Validation', async({page})=>
  {
    const maleRadioBtn= page.getByLabel('Male',{exact:true});
    const femaleRadioBtn= page.getByLabel('Female',{exact:true})

    //Locate Male & Female radio buttons -->Both should be visible
    await expect(maleRadioBtn).toBeVisible();
    await expect(maleRadioBtn).toBeEnabled();

    await expect(femaleRadioBtn).toBeVisible();
    await expect(femaleRadioBtn).toBeEnabled();

    //Select Female radio button -->Female should be selected
    await femaleRadioBtn.click();
    await expect(femaleRadioBtn).toBeChecked();

    //Verify Male radio button --> Male should NOT be selected
    await expect(maleRadioBtn).not.toBeChecked();

  })



})
