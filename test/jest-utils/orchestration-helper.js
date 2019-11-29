'use strict';

const dateFormat = require('dateformat'),
      os = require('os'),
      util = require('util'),
      exec = util.promisify(require('child_process').exec);

module.exports = {
  /**
   * Sets the unique id and the setup time environment variables needed for video tests
   * @returns {undefined} - nothing
   */
  setUniqueTestEnvironmentVariables() {
    process.env.UNIQUE_ID = process.env.BUILD_TAG || `${os.userInfo().username}-${dateFormat(new Date(), 'yyyymd_HHMMss')}`;
    process.env.TEST_SETUP_TIME = new Date().toUTCString();
  },
  /**
   * Kills all chromedriver processes. This is needed due to bugs and certain scenarios where chromedriver
   * does not shut down properly even after calling driver.quit
   * @returns {undefined} - nothing
   */
  async killChromedriverProcesses() {
    try {
      console.log('Killing all chromedriver processes.');
      await exec('pkill -f chromedriver');
    } catch (err) {
      console.error(err);
    }
  }
};
