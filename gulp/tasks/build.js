var gulp        = require('gulp');
var runSequence = require('run-sequence');
var config      = require('../config');
const rollup = require('./rollup');
const sass = require('./sass');

function build(cb) {
    runSequence(
        'sass',
        'rollup',
        cb
    );
}

gulp.task('sass', function() {
   sass();
});

gulp.task('rollup', function() {
    rollup();
});

gulp.task('build', function(cb) {
    build(cb);
});
