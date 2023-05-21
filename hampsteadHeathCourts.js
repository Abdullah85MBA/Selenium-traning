const{Builder, Browser, By, until} = require ("selenium-webdriver");

require("geckodriver");

async function automator (credentials){

let driver= await new Builder().forBrowser ("firefox").build()
await driver.get("https://auth.clubspark.uk/account/signin?ReturnUrl=%2fissue%2fwsfed%3fwa%3dwsignin1.0%26wtrealm%3dhttps%253a%252f%252fclubspark.lta.org.uk%252f%26wctx%3drm%253d0%2526id%253d0%2526ru%253dhttps%25253a%25252f%25252fclubspark.lta.org.uk%25252fParliamentHillFieldsTennisCourts%25252fBooking%25252fBookByDate%26wct%3d2023-03-05T08%253a56%253a54Z%26prealm%3dhttps%253a%252f%252fclubspark.lta.org.uk%252f%26proot%3dhttps%253a%252f%252fclubspark.lta.org.uk%252f%26paroot%3dhttps%253a%252f%252fclubspark.lta.org.uk%252fParliamentHillFieldsTennisCourts%26source%3dParliamentHillFieldsTennisCourts%26name%3dParliament%2bHill%2bFields%2bTennis%2bCourts%26nologo%3d0%26error%3dFalse%26message%3d&wa=wsignin1.0&wtrealm=https%3a%2f%2fclubspark.lta.org.uk%2f&wctx=rm%3d0%26id%3d0%26ru%3dhttps%253a%252f%252fclubspark.lta.org.uk%252fParliamentHillFieldsTennisCourts%252fBooking%252fBookByDate&wct=2023-03-05T08%3a56%3a54Z&prealm=https%3a%2f%2fclubspark.lta.org.uk%2f&proot=https%3a%2f%2fclubspark.lta.org.uk%2f&paroot=https%3a%2f%2fclubspark.lta.org.uk%2fParliamentHillFieldsTennisCourts&source=ParliamentHillFieldsTennisCourts&name=Parliament+Hill+Fields+Tennis+Courts&nologo=0&error=False&message=")
    // Full Screen
    await driver.manage().window().fullscreen();

await LtaClick(driver);
await Login(driver, credentials);
await Bookcourt (driver);
}
 
//-----------------------------------------------------------------


async function LtaClick(driver) {
  const liElements = await getElements(driver, "button");
  let LTA;
  for (const button of liElements) {
    try {
      const liClass = await button.getAttribute("class");
      const liHref = await button.getAttribute("value");
      if (liClass.includes("lta") && liHref.includes("LTA2")) {
        LTA = button;
        await LTA.click();
        break;
      }
    } catch (error) {
      console.error(error);
    }
  }
}


let credentials = {userName: "Adam8522", password: "Tennis%2022"}

async function Login(driver, credentials){
  await driver.manage().window().maximize();
    let UNField = await getElement(driver, `//*[@id="107:2;a"]`);
    await UNField.sendKeys(credentials.userName);

  
    let pwdField = await getElement(driver, `//*[@id="input-0"]`);
    await pwdField.sendKeys(credentials.password);
  
    let loginButton = await getElement(driver,
      `/html/body/div[3]/div[1]/div/div/div/div[1]/div/div[2]/div/div[2]/div/div/div/div[3]/button`
    );
  
    await loginButton.click();

}


async function getElement(driver, xpath) 
    {
      let webElements = await driver.findElements(By.xpath(xpath));
      if (webElements.length != 0) {
        return webElements[0];
      } else {
        throw new Error(`ERROR: getElement: Unable to find ${xpath}`);
      }
    }
async function getElements(driver, tagName) {
      try {
        const elements = await driver.findElements(By.tagName(tagName));
        return elements;
      } catch (error) {
        console.error(`Error finding elements with tag name ${tagName}: ${error}`);
        return [];
      }
    }

    async function waitForTextToAppear(driver, text) {
      await driver.wait(async function () {
        const element = await driver.findElement(By.tagName('body'));
        const bodyText = await element.getText();
        return bodyText.includes(text);
      });
    }

    async function Bookcourt(driver) {
      
      
      async function performActionAfterTextAppears(driver) {
        const textToWaitFor = "Abdullah Allabwani";
      
        await waitForTextToAppear(driver, textToWaitFor);
        // Next function or actions after the text appears on the screen
        const currentDate = new Date(); // Get the current date
        const nextSunday = getNextSunday(currentDate); // Get the next Sunday
        const formattedDate = formatDate(nextSunday); // Format the date as "YYYY-MM-DD"
      
        const url = `https://clubspark.lta.org.uk/ParliamentHillFieldsTennisCourts/Booking/BookByDate#?date=${formattedDate}&role=member`;
        await driver.get(url);
      
        console.log("amazing");
      }
      
      // Function to get the next Sunday
      function getNextSunday(date) {
        const dayOfWeek = date.getDay(); // Get the current day of the week (0 = Sunday, 1 = Monday, ...)
      
        // Calculate the number of days until the next Sunday (7 - dayOfWeek)
        // Add 1 to skip the current day and find the next Sunday
        const daysUntilNextSunday = 7 - dayOfWeek + 1;
      
        // Create a new Date object by adding the calculated number of days
        const nextSunday = new Date(date.getTime() + daysUntilNextSunday * 24 * 60 * 60 * 1000);
      
        return nextSunday;
      }
     

      // Function to format the date as "YYYY-MM-DD"
      function formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
      }
      await performActionAfterTextAppears(driver)
    }
    // https://clubspark.lta.org.uk/ParliamentHillFieldsTennisCourts/Booking/BookByDate#?date=2023-05-28&role=member

//     async function Bookcourt(driver) {
      
//       const calender = await driver.wait(until.elementLocated(By.xpath('/html/body/div[5]/div[4]/div/div/div/form/div/div/div[1]/div/div[1]/button')),
//       10000
//       );
//       await driver.wait(until.elementIsVisible(calender), 10000);
//       //await driver.manage().window().maximize();
//       await calender.click();
//       await driver.manage().window().maximize();

//       // Saturday 
//       const saturday = await driver.findElement(By.xpath('/html/body/div[7]/table/tbody/tr[2]/td[6]/a'));
//       await saturday.click();
//       await driver.manage().window().maximize();
// // court 6


// let freeCourt;
// const grandparent = await driver.findElement(By.xpath('/html/body/div[5]/div[4]/div/div/div/form/div/div/div[2]/div[2]/ul/li[6]/div/div/div[2]'));
// await driver.manage().window().maximize();
// const parentElements = await grandparent.findElements(By.tagName('div'));
// for (const div of parentElements) {
//   const dataAvailabilityAttributeValue = await div.getAttribute('data-availability');

//   if (dataAvailabilityAttributeValue.includes('true')) {
//     const childElements = await div.findElements(By.tagName('div'));
//     for (const div of childElements) {
//       const startTimeValue = await div.getAttribute('data-system-start-time');

//       if (startTimeValue.includes('420')) {

//         // const aElement = await div.findElement(By.tagName('a'));

//         // await driver.wait(until.elementToBeClickable(aElement), 5000); // wait for the element to be clickable
//         // // await aElement.click();
//         freeCourt = div;
//         const location = await div.getLocation();
//         const x = location.x;
//         const y = location.y;

// const actions = driver.actions({ bridge: true });
// await actions.move({ origin: freeCourt }).perform();

//         // await driver.wait(until.elementToBeClickable(freeCourt), 5000); // wait for the element to be clickable
//         await freeCourt.click();
//         break;
//       }
//     }
//   }
// }
// }



automator(credentials);




// https://clubspark.lta.org.uk/ParliamentHillFieldsTennisCourts/Booking/Book?Contacts%5B0%5D.VenueContactName=Abdullah+Allabwani&Contacts%5B0%5D.IsPrimary=true&Contacts%5B0%5D.IsMember=true&Contacts%5B0%5D.IsJunior=false&Contacts%5B0%5D.IsPlayer=true&ResourceID=95162fdc-1008-4ff1-94b9-5b50cade9a40&Date=2023-04-07&SessionID=23f5eeb7-825e-44ad-a9cc-e2b626864ca2&StartTime=420&EndTime=480&Category=0&SubCategory=0&VenueID=64c6acf4-0ecd-476b-b548-899d9963386c



//https://clubspark.lta.org.uk/ParliamentHillFieldsTennisCourts/Booking/BookByDate#?date=2023-05-21&role=member






// async function Login(driver, credentials) {
//   const liElements = await driver.findElements(By.tagName("li"));
//   let LTA;
//   for (const li of liElements) {
//     try {
//       const liClass = await li.getAttribute("class");
//       const liHref = await li.getAttribute("value");
//       if (liClass.includes("lta") && liHref.includes("LTA2")) {
//         LTA = li;
//         await LTA.click();
//         break;
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   }
// }
  
//     let UNField = await getElement(driver, `//*[@id="107:2;a"]`);
//     await UNField.sendKeys(credentials.userName);

  
//     let pwdField = await getElement(driver, `//*[@id="input-0"]`);
//     await pwdField.sendKeys(credentials.password);
  
//     let loginButtons = await driver.findElements(
//       By.xpath(`/html/body/div[3]/div[1]/div/div/div/div[1]/div/div[2]/div/div[2]/div/div/div/div[3]/button`)
//     );
  
//     await loginButton.click();
 
// }
// }


// let credentials = {userName: "Adam8522", password: "Tennis%2022"}
 


// automator(credentials);





