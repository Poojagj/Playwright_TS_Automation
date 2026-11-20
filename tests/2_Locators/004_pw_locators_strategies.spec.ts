import {test , expect} from '@playwright/test'

test("Playwright Locators", async({page})=>
{

    await page.goto("https://sdetqa.vercel.app/pw-locators-demo-app");

    /* 1) getByRole() - Find by semantic role and accessible name
     Role locators include buttons, checkboxes, headings, links, lists, tables, 
     and many more and follow W3C specifications for ARIA role.
     Prefer for interactive elements like buttons, checkboxes, links, lists, headings, tables, etc.
    */
    const Projectlink = await page.getByRole('link',{name:'Projects'});
    await expect(Projectlink).toBeVisible();


    const SignInBtn= await page.getByRole('button',{name:'Sign In'})
    await expect(SignInBtn).toBeVisible();
    await SignInBtn.click();

    /*  2) getByText() - Match visible text content on the page
   Use this locator to find non-interactive elements like div, span, p, etc. 
   For interactive elements like button, a, input, etc. use role locators.*/

    const welcomeText= page.getByText('Welcome, John! 👋'); // for exact match
    await expect(welcomeText).toBeVisible();

    const welcomeText1=page.getByText('Welcome, John! 👋',{exact:true}); //for exact match
    await expect(welcomeText1).toBeVisible();

    // const welcomeText2=page.getByText('Welcome,',{exact:false}); // not allowed
    // await expect(welcomeText2).toBeVisible();

   /*3) getByLabel() - Locate a form field using its label text
        When to use: Ideal for form fields with visible labels.*/
    const inputboxLabel= page.getByLabel("First Name");
    await inputboxLabel.fill("Pooja");

    /* 4) getByPlaceholder() - Locate an input by placeholder text
      Best for inputs without a label but having a placeholder*/

    const placeholder1=page.getByPlaceholder("Search tests...");
    await placeholder1.fill("Pooja");

    /* 5) getByAltText() - Locate an image by its alt attribute text
         identifies images (and similar elements) based on the alt attribute.
        Use this locator when your element supports alt text such as img and area elements.*/
   
        await expect(page.getByAltText("Playwright logo")).toBeVisible();

       /* 6) getByTitle() - Locate an element using its title attribute
          When to use: When your element has a meaningful title attribute.*/

    const totalTestRuns = page.getByTitle("Total test runs");
    await expect(totalTestRuns).toHaveText("4,821Total Runs"); // need to give text af all child elemen ts text
    await expect(totalTestRuns).toContainText("4,821"); // for partial text , use conatintext
    
    /*7) getByTestId() - Locate elements using the data-testid attribute
      Locate an element based on its data-testid attribute (other attributes can be configured)
      When to use: When text or role-based locators are unstable or not suitable.*/
    
      const proPlanButton= page.getByTestId('add-to-cart-pro')
      await expect(proPlanButton).toBeVisible()
      await proPlanButton.click()
    
    
     const searchButton=page.getByTestId('search-button')
     await expect(searchButton).toBeVisible()
     await searchButton.click()
    
    })



