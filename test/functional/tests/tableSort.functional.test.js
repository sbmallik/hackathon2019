'use strict';

const {By, until} = requireAbs('/test/functional/lib/constants.js'),
      utils = requireAbs('/test/functional/lib/utils.js'),
      amountsData = [
        '- 320.00 USD',
        '- 244.00 USD',
        '+ 17.99 USD',
        '+ 340.00 USD',
        '+ 952.23 USD',
        '+ 1,250.00 USD'
      ];
    
describe('Table sort test', () => {
  let driver;
    
  beforeAll(async() => {
    driver = await utils.driverInit();
    await driver.get(global.baseUrl + '/hackathonApp.html');
  });
    
  test('Validate the table sorting feature', async() => {
    const webElement = await driver.wait(until.elementLocated(By.css('.element-balances')), global.ELEMENT_TIMEOUT);
    await driver.wait(until.elementIsVisible(webElement), global.ELEMENT_TIMEOUT);
    expect(await driver.findElement(By.css('.top-menu-controls'))).toBeDefined();
    expect(await driver.findElement(By.css('.btn-primary'))).toBeDefined();
    expect(await driver.findElement(By.css('.btn-success'))).toBeDefined();
    expect(await driver.findElement(By.css('#transactionsTable'))).toBeDefined();
    const amounts = await driver.findElements(By.css('tr td:nth-child(5) span'));
    await driver.findElement(By.css('#amount')).click();
    let elementText = [];
    for (let i = 0; i < amounts.length; i++) {
      elementText[i] = await driver.findElement(By.css('tr:nth-child(' + (i + 1) + ') td:nth-child(5) span')).getText();
      expect(elementText[i]).toBe(amountsData[i]);
    };
  });

  afterAll(async() => {
    await driver.quit();
  });
});
