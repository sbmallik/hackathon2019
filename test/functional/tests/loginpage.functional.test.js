'use strict';

const {By, until} = requireAbs('/test/jest-utils/constants.js'),
      utils = requireAbs('/test/jest-utils/utils.js');
    
describe('Login page test', () => {
  let driver;
    
  beforeAll(async() => {
    driver = await utils.driverInit();
    await driver.get(global.baseUrl + '/hackathonV2.html');
  });
    
  test('Validate login page UI elements', async() => {
    const webElement = await driver.wait(until.elementLocated(By.css('.auth-header')), global.ELEMENT_TIMEOUT);
          // socialMediaLinks = await driver.findElements(By.css('a[href="#"]'));

    await driver.wait(until.elementIsVisible(webElement), global.ELEMENT_TIMEOUT);
    expect(await driver.findElement(By.css('.auth-header')).getText()).toBe('Logout Form');
    expect(await driver.findElement(By.css('.form-group:nth-child(1) > label')).getText()).toBe('Username');
    expect(await driver.findElement(By.css('.form-group:nth-child(2) > label')).getText()).toBe('Pwd');
    expect(await driver.findElement(By.css('.buttons-w span:nth-child(1) > img'))).toBeDefined();
    expect(await driver.findElement(By.css('.buttons-w span:nth-child(2) > img'))).toBeDefined();
    expect(await driver.findElement(By.css('#log-in'))).toBeDefined();
    expect(await driver.findElement(By.css('.form-check-inline'))).toBeDefined();
//     expect(socialMediaLinks.length).toBe(3);
  });

  afterAll(async() => {
    await driver.quit();
  });
});
