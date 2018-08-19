var util = require('gulp-util');

var destPath = 'build';

var config = {

    src: {
        root         : 'src',
        templates    : 'src/templates',
        sass         : 'src/sass',
        js           : 'src/js',
        img          : 'src/img',
        fonts        : 'src/fonts'
    },
    dest: {
        root : destPath,
        html : destPath,
        css  : destPath + '/css',
        js   : destPath + '/js',
        img  : destPath + '/img',
        fonts: destPath + '/fonts'
    },

    errorHandler: require('./util/handle-errors')
};

module.exports = config;
