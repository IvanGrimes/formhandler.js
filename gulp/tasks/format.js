const gulp   = require('gulp'),
      eslint = require('gulp-eslint'),
      config = require('../config');

gulp.task('format', function() {
    return gulp.src([config.src.js + '/**/**'])
               .pipe(eslint())
               .pipe(eslint.format())
               .pipe(gulp.dest(config.src.js));
});