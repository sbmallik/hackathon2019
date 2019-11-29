'use strict';

const {By, until} = requireAbs('/test/jest-utils/constants.js'),
      utils = requireAbs('/test/jest-utils/utils.js');
    
describe('Canvas chart test', () => {
  let driver;
    
  beforeAll(async() => {
    driver = await utils.driverInit();
    await driver.get(global.baseUrl + '/hackathonApp.html');
  });
    
  test('Validate financial data is displayed in chart form', async() => {
    const webElement = await driver.wait(until.elementLocated(By.css('.element-balances')), global.ELEMENT_TIMEOUT);
    await driver.wait(until.elementIsVisible(webElement), global.ELEMENT_TIMEOUT);
    await driver.findElement(By.css('#showExpensesChart')).click();
    const currentUrl = await driver.getCurrentUrl();
    expect(currentUrl).toBe(global.baseUrl + '/hackathonChart.html');
    expect(await driver.findElement(By.css('.top-menu-controls'))).toBeDefined();
    expect(await driver.findElement(By.css('#addDataset'))).toBeDefined();
    expect(await driver.findElement(By.css('#canvas'))).toBeDefined();
    expect(await driver.findElement(By.css('#transactionsTable'))).toBeDefined();
  });

  afterAll(async() => {
    await driver.quit();
  });
});
