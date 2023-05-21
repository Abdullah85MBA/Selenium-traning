const{Builder, Browser, By, untill} = require ("selenium-webdriver");

require("geckodriver");

async function automator (credentials){

let driver= await new Builder().forBrowser ("firefox").build()
await driver.get("https://camdenactive.camden.gov.uk/security/login.aspx?fdReturnURL=%2fdashboards%2f")
    // Full Screen
    await driver.manage().window().fullscreen();

await Login(driver, credentials);

await bookbutton(driver);
await Tennisclick (driver);
await court1 (driver);
await Bookcourt (driver);
await ProceedPayment (driver);
}
 


async function Bookcourt(driver) {
  const parentElement = await driver.findElement(By.xpath('//*[@id="ctl00_PageContent_repWeek_ctl02_FacilityDay1_ulHours"]'));
  const listElements = await parentElement.findElements(By.tagName('li'));
  
  let childElement;
  for (const li of listElements) {
    try {
      const aElements = await li.findElements(By.tagName('a'));
      for (const a of aElements) {
        const aClass = await a.getAttribute('class');
        const aHref = await a.getAttribute('href');
        if (aClass.includes('facility-book') && aHref.includes('Time=10')) {
          childElement = li;
          await a.click();
          break;
        }
      }
      if (childElement) {
        break;
      }
    } catch (e) {
      console.log(e);
    }
  }
}


//   let clicked = false;
//   for (const li of listElements) {
//     try {
//       const aElements = await li.findElements(By.tagName('a'));
//       for (const a of aElements) {
//         const classAttr = await a.getAttribute('class');
//         if (classAttr && classAttr.includes('facility-book')) {
//           await a.click();
//           clicked = true;
//           break;
//         }
//       }
//       if (clicked) {
//         break;
//       }
//     } catch (e) {
//       console.log(e);
//     }
//   }
// }














/*async function Bookcourt (driver) {
  const calender = await driver.findElement(By.xpath('//*[@id="ctl00_PageContent_pnlFacilityAvailability"]'));
  const freecourt = await calender.findElement(By.xpath('//*[@id="ctl00_PageContent_pnlFacilityAvailability"]/*[not(contains(@class, "facility-closed"))]'));
  await freecourt.click();
}*/

/*async function Bookcourt (driver) {
  // First, locate the element you want to click
  const Saturday = await driver.findElement(By.xpath('//*[@id="ctl00_PageContent_repWeek_ctl04_FacilityDay1_ulHours"]'));
  const Sat11AM = await Saturday.findElement(By.xpath('/html/body/form/div[4]/div[5]/div[1]/div[2]/div[1]/div[6]/ul/li[2]/a'));
  const isBooked = await Sat11AM.getAttribute('class');

  if (isBooked && isBooked.includes('facility-closed')) {
    const Friday = await driver.findElement(By.xpath('//*[@id="ctl00_PageContent_repWeek_ctl02_FacilityDay1_ulHours"]'));
    const Friday10PM = await Friday.findElement(By.xpath('/html/body/form/div[4]/div[5]/div[1]/div[2]/div[1]/div[4]/ul/li[8]/a/span'));
    await Friday10PM.click();
  } else {
    await Sat11AM.click(); 
  }
}*/

async function ProceedPayment (driver){
  let Paymentbutton = await getElement(driver, `.//a[@id="ctl00_PageContent_btnContinue"]`);
  await Paymentbutton.click();
  await driver.sleep(3000);
  const cardnumber = await driver.findElement(By.xpath('//*[@id="scp_cardPage_cardNumber_input"]'));
  await cardnumber.sendKeys(paymentdetails.cardNumber); 
  const ExpiryDateMonth = await driver.findElement(By.xpath('//*[@id="scp_cardPage_expiryDate_input"]'));
  await ExpiryDateMonth.sendKeys(paymentdetails.XdateM); 
  const ExpiryDateYear = await driver.findElement(By.xpath('//*[@id="scp_cardPage_expiryDate_input2"]'));
  await ExpiryDateYear.sendKeys(paymentdetails.XdateY); 
  const SecurityCode = await driver.findElement(By.xpath('//*[@id="scp_cardPage_csc_input"]'));
  await SecurityCode.sendKeys(paymentdetails.SecCode);  
  const Pay = await driver.findElement(By.xpath('//*[@id="scp_cardPage_buttons_continue_button"]'));
  await Pay.click();

 
}
let paymentdetails= {cardNumber:"123456789",XdateM:"02",XdateY:"25",SecCode:"123"}

//async function Bookcourt1 (driver){
//const parentElement = await driver.findElement(By.xpath('//*[@id="ctl00_PageContent_repWeek_ctl06_FacilityDay1_ulHours"]'));
//const childElement = await parentElement.findElement(By.xpath('/html/body/form/div[4]/div[5]/div[1]/div[2]/div[1]/div[8]/ul/li[6]/a'));
//await childElement.click();
//}




async function Login(driver, credentials) {
    let UNField = await getElement(driver, `.//input[@type="email"]`);
    await UNField.sendKeys(credentials.userName);

  
    let pwdField = await getElement(driver, `.//input[@type="password"]`);
    await pwdField.sendKeys(credentials.password);
  
    let loginButtons = await driver.findElements(
      By.xpath(`.//a[@id="ctl00_PageContent_LoginPanel1_btnLogin"]`)
    );
  
    let loginButton = loginButtons[0];
    await loginButton.click();
 
}

let credentials = {userName: "Abdullah.Allabwani@gmail.com", password: "Waterlow*1985"}
 
async function getElement(driver, xpath) {
    let webElements = await driver.findElements(By.xpath(xpath));
    if (webElements.length != 0) {
      return webElements[0];
    } else {
      throw new Error(`ERROR: getElement: Unable to find ${xpath}`);
    }
}

async function bookbutton (driver){
  let element = await getElement(driver, `.//a[@class="main-menu-item main-menu-item-motivated"]`);
    await element.click();
    await driver.manage().window().fullscreen();
}
async function Tennisclick (driver){
        let element2 = await getElement(driver, `.//a[@id="ctl00_PageContent_repCourseCategories_ctl09_btnViewCourses"]`);
          await element2.click();

}

async function court1 (driver){
    let element3 = await getElement(driver, `.//a[@id="ctl00_PageContent_repCourses_ctl01_txtCategoryName"]`);
      await element3.click();

}







automator(credentials);





