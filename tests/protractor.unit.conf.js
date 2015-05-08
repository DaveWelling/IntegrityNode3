exports.config = {
    allScriptsTimeout: 11000,
	seleniumAddress: 'http://127.0.0.1:4444/wd/hub',
    specs: [
        'uiAutomation/dynamicTree/*.spec.js'
    ],
    baseUrl: 'http://localhost:3000',

    capabilities: {
        'browserName': 'chrome'
    },

    framework: 'mocha',
    mochaOpts: {
        enableTimeouts: false
    }
};
