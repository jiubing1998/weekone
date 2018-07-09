//引入
var gulp = require('gulp');
var server = require('gulp-webserver');
var htmlMin = require('gulp-htmlmin');
var devScss = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var babel = require('gulp-babel');

var url = require('url');
var path = require('path');
var fs = require('fs');
var data = require('./data/data.json');

//起服务
gulp.task('server', function() {
    gulp.src('src')
        .pipe(server({
            port: 8080,
            middleware: function(req, res, next) {
                var pathname = url.parse(req.url).pathname;
                if (pathname === '/favicon.ico') {
                    return false
                }
                if (pathname === '/api/list') {
                    res.end(JSON.stringify({ code: 1, data: data }))
                } else {
                    pathname = pathname === '/' ? 'index.html' : pathname;
                    res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)));
                }
            }
        }))
});
//压缩html
var options = {
    collapseWhitespace: true
}
gulp.task('htmlMin', function() {
    gulp.src('./src/*.html')
        .pipe(htmlMin(options))
        .pipe(gulp.dest('build'))
});
//压缩css
gulp.task('devScss', function() {
    gulp.src('./src/css/*.css')
        .pipe(devScss())
        .pipe(gulp.dest('build/css'))
});
//压缩js
gulp.task('devJs', function() {
    gulp.src(['./src/js/*.js', '!./src/js/*.min.js'])
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('build/js'))
})

gulp.task('build', ['server', 'htmlMin', 'devScss', 'devJs'])