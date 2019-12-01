const {By, Target, until} = requireAbs('/test/jest-utils/constants.js'),
      utils = requireAbs('/test/jest-utils/utils.js');

describe('visual test', () => {
  let driver, 
      eyes,
      testName;

  beforeEach(async() => {
    driver = await utils.driverInit();
    eyes = await utils.eyesInit();
    await driver.get(global.baseUrl + '/hackathonAppV2.html');
  });

  testName = test('Viewport capture of data table', async() => {
    await driver.findElement(By.css('#amount')).click();
    await eyes.open(driver, global.appName, testName.description);
    await eyes.check('viewport', Target.window());
    await utils.validateLegacyResult(eyes);
  });

  afterEach(async() => {
    await eyes.abortIfNotClosed();
    await driver.quit();
  });
});
