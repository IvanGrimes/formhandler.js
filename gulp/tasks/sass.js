const gulp = require('gulp'),
  sass = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  cleanCSS = require('gulp-cleancss'),
  rename = require('gulp-rename'),
  config = require('../config');

function build() {
  const env = process.env.NODE_ENV || 'development';

  gulp.src(config.src.sass + '/*.{sass,scss}')
    .pipe(sass()).on('error', config.errorHandler)
    .pipe(autoprefixer({
      browsers: ['last 30 versions'],
      cascade: false,
    }))
    .pipe(gulp.dest(config.dest.css))
    .on('end', () => {
      if (env === 'development') {
        return;
      }
      gulp.src(config.dest.css + '/formhandler.css')
        .pipe(cleanCSS({
          advanced: false,
          aggressiveMerging: false,
        }))
        .pipe(rename((filePath) => {
          /* eslint no-param-reassign: ["error", { "props": false }] */
          filePath.basename += '.min';
        }))
        .pipe(gulp.dest('./dist/css'));
    });
}

module.exports = build;
