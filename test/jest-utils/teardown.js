'use strict';
const util = require('util'),
      exec = util.promisify(require('child_process').exec);

module.exports = async function globalTearDown() {
  // Kills all chromedriver processes
  try {
    console.log('Killing all chromedriver processes.');
    await exec('pkill -f chromedriver');
  } catch (err) {
    console.error(err);
  }
};
