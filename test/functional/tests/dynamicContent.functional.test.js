'use strict';

const {By, until} = requireAbs('/test/jest-utils/constants.js'),
      utils = requireAbs('/test/jest-utils/utils.js');
    
describe('Dynamic contents test', () => {
  let driver;
    
  beforeAll(async() => {
    driver = await utils.driverInit();
    await driver.get(global.baseUrl + '/hackathonAppV2.html?showAd=true');
  });
    
  test('Validate ADs are displayed after login', async() => {
    const webElement = await driver.wait(until.elementLocated(By.css('.element-balances')), global.ELEMENT_TIMEOUT),
          flashSale = await driver.wait(until.elementLocated(By.css('#flashSale')), global.ELEMENT_TIMEOUT),
          flashSale2 = await driver.wait(until.elementLocated(By.css('#flashSale2')), global.ELEMENT_TIMEOUT);
    await driver.wait(until.elementIsVisible(webElement), global.ELEMENT_TIMEOUT);
    await driver.wait(until.elementIsVisible(flashSale), global.ELEMENT_TIMEOUT);
    await driver.wait(until.elementIsVisible(flashSale2), global.ELEMENT_TIMEOUT);
  });

  afterAll(async() => {
    await driver.quit();
  });
});
