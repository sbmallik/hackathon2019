'use strict';

const {Builder, By, until, ChromeOptions, Eyes, MatchLevel, StitchMode, ConsoleLogHandler} = requireAbs('/test/jest-utils/constants.js');

module.exports = {
  async driverInit() {
    let driver = await new Builder().forBrowser('chrome').setChromeOptions(new ChromeOptions().headless()).build();
    await driver.manage().window().setRect({
      width: 1280,
      height: 960
    });
    return driver;
  },
  eyesInit() {
    let eyes = new Eyes();
    eyes.setLogHandler(new ConsoleLogHandler(false));
    eyes.setSendDom(false);
    eyes.setHideScrollbars(true);
    eyes.setMatchLevel(MatchLevel.Strict);
    eyes.setForceFullPageScreenshot(false);
    eyes.setStitchMode(StitchMode.CSS);
    eyes.setBatch(`ah2019-${process.env.UNIQUE_ID}`, process.env.UNIQUE_ID, process.env.TEST_SETUP_TIME);
    eyes.setApiKey(process.env.APPLITOOLS_API_KEY);
    eyes.setServerUrl(process.env.APPLITOOLS_SERVER_URL);
    eyes.setWaitBeforeScreenshots(1000);
    eyes.setMatchTimeout(10000);
    return eyes;
  },
  async suppressElement(driver, selector) {
    await driver.wait(until.elementLocated(By.css(selector + ' iframe[data-load-complete="true"]')), ELEMENT_TIMEOUT).then(async function waitForElementDisplay(element) {
      await driver.wait(until.elementIsVisible(element), ELEMENT_TIMEOUT);
    });
    await driver.executeScript((pageElement) => {
      document.querySelector(pageElement).setAttribute('style', 'display:none');
    }, [selector]);
  },
  async validateLegacyResult(eyes) {
    await eyes.close(false).then((result) => {
      if (result.getIsNew()) {
        console.log(`New baseline created: URL = ${result.getAppUrls().getSession()}`);
      } else {
        expect(result.getMismatches()).toBe(0);
      }
    });
  }
};
