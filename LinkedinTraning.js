const{Builder, Browser, By} = require ("selenium-webdriver");

require("geckodriver");

async function automator (credentials){

let driver= await new Builder().forBrowser ("firefox").build()
await driver.get("https://camdenactive.camden.gov.uk/security/login.aspx?fdReturnURL=%2fdashboards%2f")
    // Full Screen
    await driver.manage().window().fullscreen();

Login(driver, credentials);

bookbutton(driver);
Tennisclick (driver);
court1 (driver);
}

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
    element.click();
    await driver.manage().window().fullscreen();
}
    async function Tennisclick (driver){
        let element2 = await getElement(driver, `.//a[@id="ctl00_PageContent_repCourseCategories_ctl09_btnViewCourses"]`);
          element2.click();

 }

  async function court1 (driver){
    let element3 = await getElement(driver, `.//a[@id="ctl00_PageContent_repCourses_ctl01_txtCategoryName"]`);
      element3.click();

}
  


let credentials = {userName: "Abdullah.Allabwani@gmail.com", password: "Waterlow*1985"}


automator(credentials);



