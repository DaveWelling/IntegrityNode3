module.exports = function (config) {
	config.set({
		// Test frameworks to use
		frameworks: ['jasmine'],

	    // Base path, that will be used to resolve files and exclude
		basePath: '../public',

	    // List of files / patterns to load in the browser
	    //  { pattern: 'Scripts/App/Directives/*.html', watched: true, included: false, served: true },
		files: [
			{ pattern: 'bower_components/jquery/dist/jquery.js', watched: false, included: true, served: true },
			{ pattern: 'bower_components/angular/angular.js', watched: false, included: true, served: true },
            { pattern: 'bower_components/angular-route/angular-route.js', watched: false, included: true, served: true },
            { pattern: 'bower_components/cuid/dist/browser-cuid.js', watched: false, included: true, served: true },
            { pattern: 'bower_components/angular-mocks/angular-mocks.js', watched: false, included: true, served: true },
            { pattern: 'vendor/sinon-1.12.2.js', watched: false, included: true, served: true },
			'src/app.js',
			'src/**/*.js',
			'client/clientBusinessLogicModule/**/*.js'
		],

		// Preprocessors to convert e.g. html to angular template cache items
		//preprocessors: {
	    //	"Scripts/App/Directives/*.html": ['ng-html2js'],
		//},
		preprocessors: {
		    //"Scripts/App/**/*.js": ['coverage']
			// there are too many jshint fails in app to enable right now
			// "Scripts/App/**/*.js" : ['jshint','coverage']
		},

		// List of files to exclude
		exclude: [],

		// Test results reporter to use possible values: dots, growl, junit, ...
		//reporters: ['coverage', 'progress', 'xml'],
		reporters: ['progress', 'xml'], //, 'coverage'],

		// Web server port
		port: 10082,

		// CLI runner port
		runnerPort: 9102,

		// Enable / disable colors in the output (reporters and logs)
		colors: true,

		// Level of logging: LOG_DISABLE, LOG_ERROR, LOG_WARN, LOG_INFO, LOG_DEBUG
		logLevel: config.LOG_DEBUG,

		// Enable / disable watching file and execute tests on changes
		autoWatch: true,

		// Start these browsers, currently available:
		// - Chrome
		// - ChromeCanary
		// - Firefox
		// - Opera
		// - Safari (only Mac)
		// - PhantomJS
		// - IE (only Windows)
		browsers: ['Chrome'],

		// If browser does not capture in given timeout [ms], kill it
		captureTimeout: 5000,

		// Continuous Integration mode
		// if true, it capture browsers, run tests and exit
		singleRun: false,

	    // Plugins
		plugins: [
			'karma-jasmine',
			//'karma-js-coverage',
			'karma-jshint',
            'karma-chrome-launcher',
            'Karma-phantomjs-launcher',
			'karma-firefox-launcher',
			'karma-junit-reporter',
			'karma-xml-reporter'
		]

        //coverageReporter: {
		 //   type: 'html',
		 //   dir: 'coverage/'
	    //}
	});
};