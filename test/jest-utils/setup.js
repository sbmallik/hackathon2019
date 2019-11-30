'use strict';

const path = require('path'),
      dateFormat = require('dateformat'),
      os = require('os');
require('./require-abs.js')(path.resolve(__dirname, '../../') + '/');

const capabilities = requireAbs('test/jest-utils/constants.js').capabilities;

module.exports = async function globalSetup() {
  // Sets the test environment from command line
  let envSettings = process.argv.slice(-1).toString().split('=')[1];
  if (!envSettings) {
    envSettings = 'desktopChrome';
  }
  process.env.CAPS = JSON.stringify(capabilities[envSettings]);

  // Sets the unique id and the setup time environment variables needed for video tests
  process.env.UNIQUE_ID = process.env.BUILD_TAG || `${os.userInfo().username}-${dateFormat(new Date(), 'yyyymd_HHMMss')}`;
  process.env.TEST_SETUP_TIME = new Date().toUTCString();
};
