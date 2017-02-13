var gulp = require('gulp'),
critical =  require('critical');

gulp.task('critical', [], function (cb) {
    critical.generate({
        inline: true,
        base: 'build/',
        src: 'index.html',
        dest: 'build/index-critical.html',
        minify: true,
        width: 1200,
        height: 900
    });
});
