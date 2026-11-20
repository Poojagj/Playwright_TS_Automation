import {test,expect} from '@playwright/test'

const pageURL='https://sdetqa.vercel.app/autoplay'

test.describe('Data Entry Form Test Validations 2', ()=>
{
test.beforeEach(async({page})=>
{
    await page.goto(pageURL);
    const pageLogo=  page.getByText('AutoPlay',{exact : true});
    await expect(pageLogo).toBeVisible();
})

//4. Checkbox (Days) Validation
test('4. Checkbox (Days) Validation', async({page})=>
{
    //Select Sun checkbox --> Sun should be checked
    const sunChkBx= page.getByLabel('Sun',{ exact:true});
    await sunChkBx.check();
    await expect(sunChkBx).toBeChecked();
    sunChkBx.setChecked(true)  //sunChkBx.setChecked(false)  true- check  false - uncheck

    //Select all checkboxes (Mon–Sun) --> All should be checked
    const allDays=['Sun','Mon','Tue','Wed','Thu','Fri','Sat']

    //selection with Map
    const allCheckBoxes= allDays.map((day)=>
    {
      return page.getByLabel(day);
    })

    for(const checkBox of allCheckBoxes)
    {
        await checkBox.check();
        await expect(checkBox).toBeChecked();

    }

    //without map --> (prefer loop)

    // for( const Day of allDays)
    // {
    //   const chkBx= page.getByLabel(Day);
    //   await chkBx.check();
    //   await expect(chkBx).toBeChecked();
    // }

    //Uncheck last 3 (Fri, Sat, Sun) These should be unchecked

    const daysToBeChecked= ['Fri','Sat','Sun']

    for(const dayToCheck of daysToBeChecked)
    {
        const dayCheckBox = page.getByLabel(dayToCheck);
        await dayCheckBox.uncheck();
        await expect(dayCheckBox).not.toBeChecked();

    }

    //Toggle all checkboxes --> Checked → unchecked, unchecked →checked
    for(const toToggleDays of allDays)
    {
        const toggledChkBx= page.getByLabel(toToggleDays)
        if(await toggledChkBx.isChecked())
        {
              await toggledChkBx.uncheck();
              await expect(toggledChkBx).not.toBeChecked();
        }
        else
        {
            await toggledChkBx.check();
            await expect(toggledChkBx).toBeChecked();
        }
        
    }

    // Select checkboxes using index (1,3,6 → Tue, Thu,Sun) --> Only those indexes should be checked
    
     //selection with Map--> used above
    // const allCheckBoxes= allDays.map((day)=>
    // {
    //   return page.getByLabel(day);
    // })

    const indexes=[1,3,6]
    for(const i of indexes)
    {
      await allCheckBoxes[i].check();
      await expect(allCheckBoxes[i]).toBeChecked();

    }

    //Select checkbox with label "Fri" --> Friday checkbox should be checked
      const fridayCheckbox=page.getByLabel('Fri')
      await fridayCheckbox.check()
      await expect(fridayCheckbox).toBeChecked()

})

})