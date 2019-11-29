'use strict';

const path = require('path');
require('./require-abs.js')(path.resolve(__dirname, '../../') + '/');

const orchestrationHelper = requireAbs('test/jest-utils/orchestration-helper.js'),
      capabilities = requireAbs('test/functional/lib/constants.js').capabilities;

module.exports = async function globalSetup() {
  let envSettings = process.argv.slice(-1).toString().split('=')[1];
  if (!envSettings) {
    envSettings = 'desktopChrome';
  }

  orchestrationHelper.setUniqueTestEnvironmentVariables();
  process.env.CAPS = JSON.stringify(capabilities[envSettings]);
};
