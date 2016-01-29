'use strict';

const { should } = require('../support/setup');

const wd = require('wd');
const serverConfigs = require('../support/appium-servers');

describe('Prompt tests', function () {
  this.timeout(200000);
  let driver;

  beforeEach(function () {
    const serverConfig = serverConfigs.local;
    driver = wd.promiseChainRemote(serverConfig);

    const desired = {
      ...require('../support/caps').android19,
      app: require('../support/apps').androidDemo
    };

    return driver
      .init(desired)
      .setImplicitWaitTimeout(2000);
  });

  afterEach(function () {
    return driver.quit();
  });

  it('opens prompt when visible is true', () => {
    return driver
      .elementByXPath('//android.widget.TextView[@text=\'Open prompt\']')
      .click()
      .elementByXPath('//android.widget.TextView[@text=\'Say something\']')
      .should.eventually.exist;
  });

  it('allows user to cancel prompt', () => {
    return driver
      .elementByXPath('//android.widget.TextView[@text=\'Open prompt\']')
      .click()
      .elementByXPath('//android.widget.TextView[@text=\'Cancel\']')
      .click()
      .elementByXPath('//android.widget.TextView[@text=\'You cancelled\']')
      .should.eventually.exist;
  });

  it('invokes submit callback with user value', () => {
    return driver
      .elementByXPath('//android.widget.TextView[@text=\'Open prompt\']')
      .click()
      .elementByXPath('//android.widget.TextView[@text=\'OK\']')
      .click()
      .elementByXPath('//android.widget.TextView[@text=\'You said "Hello"\']')
      .should.eventually.exist;
  });
});
