'use strict';

const {By, until} = requireAbs('/test/jest-utils/constants.js'),
      utils = requireAbs('/test/jest-utils/utils.js');
    
describe('Dynamic contents test', () => {
  let driver;
    
  beforeAll(async() => {
    driver = await utils.driverInit();
    await driver.get(global.baseUrl + '/hackathonApp.html?showAd=true');
  });
    
  test('Validate ADs are displayed after login', async() => {
    const webElement = await driver.wait(until.elementLocated(By.css('.element-balances')), global.ELEMENT_TIMEOUT);
    await driver.wait(until.elementIsVisible(webElement), global.ELEMENT_TIMEOUT);
    expect(await driver.findElement(By.css('#flashSale'))).toBeDefined();
    expect(await driver.findElement(By.css('#flashSale2'))).toBeDefined();
  });

  afterAll(async() => {
    await driver.quit();
  });
});
