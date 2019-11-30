const {By, Target, until} = requireAbs('/test/jest-utils/constants.js'),
      utils = requireAbs('/test/jest-utils/utils.js');

describe('visual test', () => {
  let driver, 
      eyes,
      testName;

  beforeEach(async() => {
    driver = await utils.driverInit();
    eyes = await utils.eyesInit();
    eyes.setForceFullPageScreenshot(true);
    await driver.get(global.baseUrl + '/hackathonChart.html');
  });

  testName = test('Viewport capture of data chart', async() => {
    await eyes.open(driver, global.appName, testName.description);
    await eyes.check('viewport', Target.window());
    await utils.validateLegacyResult(eyes);
  });

  afterEach(async() => {
    await eyes.abortIfNotClosed();
    await driver.quit();
  });
});
