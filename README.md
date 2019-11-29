# hackathon2019

***
## Test Framework

This repository contains the test code, which executes *visual* tests for new _Applitools hackathon_. The JEST (Javascript / NodeJS based) test runner is used for this project. The visual testing part will be performed by *Applitools*. Both functional and visual tests use Javascript framework, which in turn uses Selenium-Webdriver to deal with all user interactions with the web pages. All tests are run locally and no cloud based platform in used.

### Pre-requisites

* A Bourne-compatible shell, like bash or zsh
* [Git](http://gitscm.com/)
* [Node 10.15+](http://nodejs.org/)
* An Applitools account.

### Setup

Clone this GIT repository to the local machine as follows:
```
$ git clone git@github.com:sbmallik/hackathon2019.git
$ cd hackathon2019
```

The following step installs all dependent packages required by the test code. Please note the system configuration used in this repository is minimal and it was added inside `package.json` file.
```
$ npm install
```

### Environment variables used

Certain parameters such as authentication and other internal variables are obtained from the environment variables and these are listed below:

1. `APPLITOOLS_API_KEY` - This key provides access to the Applitools Test Manager (and the Team within)
1. `APPLITOOLS_BATCH_ID` - This value is used to group the tests by a specific criteria (like browser, platform, test-name etc)
1. `APPLITOOLS_SERVER_URL` - This specifies the Applitools test manager URL

All these variables must be exported so that it allows all child processes to inherit.

### Running Tests

All tests are executed in the local machine. These uses a local instance of `chromedriver` for the desktop variant.

The test execution occurs as per JEST configuration file. In the present case, a specific file extension serves as a qualifier along with a specific locations (including the subfolders).

The following command runs all tests from the folder `test/functional/tests/` folder:
```
$ npm run test:functional
```

### Filtering tests

In order to run a single test the above command needs additional parameters like the filename. The new command would be:
```
$ npm run test:functional -t <filename>
```
Please note a full pathname ins't necessary. Even a partial filename works. A partial filename may trigger multiple tests if the text string is common. 
