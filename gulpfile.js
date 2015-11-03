'use strict';

var gulp   = require('gulp');
var eslint = require('gulp-eslint');
var mocha  = require('gulp-mocha');

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

gulp.task('test', function() {
    return gulp
        .src(['test/**/*.js'])
        .pipe(mocha({reporter: 'nyan'}));
});

gulp.task('default', ['lint', 'test'], function() {
    // This will only run if the lint task is successful...
});
