var gulp   = require('gulp');
var config = require('../config');

gulp.task('rollup:watch', function() {
    gulp.watch(config.src.js + '/**/**', ['rollup']);
});

gulp.task('sass:watch', function () {
  gulp.watch(config.src.sass + '/**/**', ['sass']);
});

gulp.task('watch',
    [
    'sass:watch',
    'rollup:watch',
    ]
);
