import {test, expect} from '@playwright/test'
/*
fixtures:- gloabl variables :- page , browsers

test(  
"Title", 
async ({page}) => { step 1; step2;....} 
)

*/


test("Verify Title" , async({page})=>
{
    await page.goto("https://demowebshop.tricentis.com/");
    await expect(page).toHaveTitle("Demo Web Shop");
}
)