/*
Note:
Jest sets up a new environment for every test file. Configs are loaded and node vault utility reads secret from file.
*/

/* Allow absolute paths for reference files based on this folder */
require('./require-abs.js')(__dirname + '/../..');

global.baseUrl = 'https://demo.applitools.com';

/* Set default timeout for all tests. */
const TEST_TIMEOUT = 5 * 60 * 1000;
jest.setTimeout(TEST_TIMEOUT);

/* Set the environment for the current test */
global.capabilities = `${process.env.CAPS}`;
global.appName = 'hackathon2019';
global.ELEMENT_TIMEOUT = 5000;
