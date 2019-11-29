'use strict';

const {By, until} = requireAbs('/test/functional/lib/constants.js'),
      utils = requireAbs('/test/functional/lib/utils.js');
    
describe('Data driven test', () => {
  let driver;
    
  beforeAll(async() => {
    driver = await utils.driverInit();
    await driver.get(global.baseUrl + '/hackathon.html');
  });
    
  test('login-no-inputs', async() => {
    await driver.findElement(By.css('#log-in')).click();
    const alertBanner1 = await driver.wait(until.elementLocated(By.css('.alert-warning')), global.ELEMENT_TIMEOUT);
    await driver.wait(until.elementIsVisible(alertBanner1), global.ELEMENT_TIMEOUT);
    await driver.navigate().refresh();
  });

  test('login with username only', async() => {
    const usernameInput = await driver.findElement(By.css('#username'));
    expect(usernameInput).toBeDefined();
    usernameInput.sendKeys('smallik');
    await driver.findElement(By.css('#log-in')).click();
    const alertBanner1 = await driver.wait(until.elementLocated(By.css('.alert-warning')), global.ELEMENT_TIMEOUT);
    await driver.wait(until.elementIsVisible(alertBanner1), global.ELEMENT_TIMEOUT);
    await driver.navigate().refresh();
  });

  test('login with password only', async() => {
    const passwordInput = await driver.findElement(By.css('#password'));
    expect(passwordInput).toBeDefined();
    passwordInput.sendKeys('abc123');
    await driver.findElement(By.css('#log-in')).click();
    const alertBanner1 = await driver.wait(until.elementLocated(By.css('.alert-warning')), global.ELEMENT_TIMEOUT);
    await driver.wait(until.elementIsVisible(alertBanner1), global.ELEMENT_TIMEOUT);
    await driver.navigate().refresh();
  });
 
  test('Validate successful login', async() => {
    const usernameInput = await driver.findElement(By.css('#username')),
          passwordInput = await driver.findElement(By.css('#password'));

    expect(usernameInput).toBeDefined();
    expect(passwordInput).toBeDefined();
    usernameInput.sendKeys('smallik');
    passwordInput.sendKeys('abc123');
    await driver.findElement(By.css('#log-in')).click();
    const currentUrl = await driver.getCurrentUrl();
    expect(currentUrl).toBe(global.baseUrl + '/hackathonApp.html');
  });

  afterAll(async() => {
    await driver.quit();
  });
});
