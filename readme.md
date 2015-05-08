To run tests:
npm install -g protractor
webdriver-manager update/install --standalone
webdriver-manager start
npm install -g mocha
protractor tests\protractor.unit.conf.js