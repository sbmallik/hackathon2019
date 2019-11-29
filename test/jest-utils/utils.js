'use strict';

const {Builder, By, until, ChromeOptions} = requireAbs('/test/jest-utils/constants.js');

module.exports = {
  async driverInit() {
    // add code here to update env ver USE_SAUCE_CONNECT
    let driver = await new Builder().forBrowser('chrome').setChromeOptions(new ChromeOptions().headless()).build();
    await driver.manage().window().setRect({
      width: 1280,
      height: 960
    });
    return driver;
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
