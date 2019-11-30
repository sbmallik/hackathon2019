const {By, Target, until, MatchLevel} = requireAbs('/test/jest-utils/constants.js'),
      utils = requireAbs('/test/jest-utils/utils.js');

describe('visual test', () => {
  let driver, 
      eyes,
      testName;

  beforeEach(async() => {
    driver = await utils.driverInit();
    eyes = await utils.eyesInit();
    eyes.setMatchLevel(MatchLevel.Layout2);
    await driver.get(global.baseUrl + '/hackathonApp.html?showAd=true');
  });

  testName = test('Viewport capture of dynamic contents', async() => {
    await eyes.open(driver, global.appName, testName.description);
    await eyes.check('viewport', Target.window());
    await utils.validateLegacyResult(eyes);
  });

  afterEach(async() => {
    await eyes.abortIfNotClosed();
    await driver.quit();
  });
});
