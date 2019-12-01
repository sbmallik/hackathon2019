const {By, Target, until} = requireAbs('/test/jest-utils/constants.js'),
      utils = requireAbs('/test/jest-utils/utils.js');

describe('visual test', () => {
  let driver, 
      eyes,
      testName;

  beforeEach(async() => {
    driver = await utils.driverInit();
    eyes = await utils.eyesInit();
    await driver.get(global.baseUrl + '/hackathonV2.html');
  });

  testName = test('Capture invalid login scenario', async() => {
    const passwordInput = await driver.findElement(By.css('#password'));
    expect(passwordInput).toBeDefined();
    await driver.findElement(By.css('#log-in')).click();
    const alertBanner1 = await driver.wait(until.elementLocated(By.css('.alert-warning')), global.ELEMENT_TIMEOUT);
    await driver.wait(until.elementIsVisible(alertBanner1), global.ELEMENT_TIMEOUT);
    await eyes.open(driver, global.appName, testName.description);
    await eyes.check('viewport', Target.window());
    await utils.validateLegacyResult(eyes);
  });

  afterEach(async() => {
    await eyes.abortIfNotClosed();
    await driver.quit();
  });
});
