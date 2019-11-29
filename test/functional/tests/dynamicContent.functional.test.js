'use strict';

const {By, until} = requireAbs('/test/jest-utils/constants.js'),
      utils = requireAbs('/test/jest-utils/utils.js');
    
describe('Dynamic contents test', () => {
  let driver;
    
  beforeAll(async() => {
    driver = await utils.driverInit();
    await driver.get(global.baseUrl + '/hackathon.html?showAd=true');
  });
    
  test('Validate ADs are displayed after login', async() => {
    const webElement = await driver.wait(until.elementLocated(By.css('.auth-header')), global.ELEMENT_TIMEOUT),
          socialMediaLinks = await driver.findElements(By.css('a[href="#"]'));
    await driver.findElement(By.css('#username')).sendKeys('smallik');
    await driver.findElement(By.css('#password')).sendKeys('abc123');
    await driver.findElement(By.css('#log-in')).click();
    const currentUrl = await driver.getCurrentUrl();
    expect(currentUrl).toBe(global.baseUrl + '/hackathonApp.html?showAd=true');
    expect(await driver.findElement(By.css('#flashSale'))).toBeDefined();
    expect(await driver.findElement(By.css('#flashSale2'))).toBeDefined();
  });

  afterAll(async() => {
    await driver.quit();
  });
});
