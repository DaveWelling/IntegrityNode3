var protractor = require("gulp-protractor").protractor;
var webdriver_standalone = require("gulp-protractor").webdriver_standalone;

var gulp = require('gulp');
var path = require('path');
var child_process = require('child_process');

gulp.src(["./tests/uiAutomation/dynamicTree/*.js"])
	.pipe(protractor({
		configFile: "tests/protractor.unit.config.js"
	}))
	.on('error', function(e) { throw e });

gulp.task('webdriver_standalone', webdriver_standalone);


function getProtractorBinary(binaryName){
	var winExt = /^win/.test(process.platform)? '.cmd' : '';
	var pkgPath = require.resolve('protractor');
	var protractorDir = path.resolve(path.join(path.dirname(pkgPath), '..', 'bin'));
	return path.join(protractorDir, '/'+binaryName+winExt);
}

gulp.task('protractor-install', function(done){
	child_process.spawn(getProtractorBinary('webdriver-manager'), ['update'], {
		stdio: 'inherit'
	}).once('close', done);
});

gulp.task('protractor-run', function (done) {
	var argv = process.argv.slice(3); // forward args to protractor
	child_process.spawn(getProtractorBinary('protractor'), argv, {
		stdio: 'inherit'
	}).once('close', done);
});