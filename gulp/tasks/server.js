var gulp   = require('gulp'),
    server = require('browser-sync').create(),
    util   = require('gulp-util'),
    config = require('../config');

// in CL 'gulp server --open' to open current project in browser
// in CL 'gulp server --tunnel siteName' to make project available over http://siteName.localtunnel.me

gulp.task('server', function() {
    server.init({
        server: ['sandbox', 'build'],
        files: [
            'sandbox/index.html',
            'dist/css/*.css',
            'dist/js/*.js'
        ],
        port: util.env.port || 3000,
        logLevel: 'info', // 'debug', 'info', 'silent', 'warn'
        logConnections: false,
        logFileChanges: true,
        open: Boolean(util.env.open),
        notify: false,
        ghostMode: false,
        online: Boolean(util.env.tunnel),
        tunnel: util.env.tunnel || null//починить туннель
    });
});

module.exports = server;
