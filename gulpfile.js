'use strict';

var gulp      = require('gulp');
var eslint    = require('gulp-eslint');
var mocha     = require('gulp-mocha');
var istanbul  = require('gulp-istanbul');
var coveralls = require('gulp-coveralls');
var del       = require('del');

gulp.task('clean', function(done) {
    return del([
        './coverage/'
    ], done);
});

gulp.task('lint', function() {
    return gulp
        .src([
            '*.js',
            'lib/**/*.js'
        ])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('pre-test', ['clean'], function() {
    return gulp
        .src(['lib/**/*.js'])
        .pipe(istanbul())
        .pipe(istanbul.hookRequire());
});

gulp.task('test', ['pre-test'], function() {
    return gulp
        .src(['test/**/*.js'])
        .pipe(mocha({reporter: 'spec'}))
        .pipe(istanbul.writeReports())
        .pipe(istanbul.enforceThresholds({thresholds: {
            global: 25
        }}));
});

gulp.task('coveralls', function() {
    return gulp
        .src('./coverage/**/lcov.info')
        .pipe(coveralls());
});

gulp.task('default', ['lint', 'test'], function() {
    // This will only run if the lint task is successful...
});
