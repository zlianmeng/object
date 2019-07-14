const gulp = require('gulp');
const watch = require('gulp-watch');
const minihtml = require('gulp-minify-html');
const comfilesass = require('gulp-sass');
const minicss = require('gulp-minify-css');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const es2015 = require('babel-preset-es2015');
const babel = require('gulp-babel');
const babelcore = require('babel-core');
gulp.task('uglifyhtml', function () {
    return gulp.src('src/*.html')
        .pipe(minihtml())
        .pipe(gulp.dest('dist/'))
})
gulp.task('comfilesass', function () {
    return gulp.src('src/sass/*.scss')
        .pipe(comfilesass({
            outputStyle: 'compressed'
        }
        ))
        .pipe(gulp.dest('dist/style'))
})
gulp.task('minicss', function () {
    return gulp.src('src/css/*.css')
        .pipe(minicss())
        .pipe(gulp.dest('dist/style'))
})
gulp.task('uglify', function () {
    return gulp.src('dist/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
})
gulp.task('babeljs', () => {
    return gulp.src('src/script/js/*.js')//引入文件
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('dist/js'));//输出
});

gulp.task('default', function () {
    watch(['src/*.html', 'src/sass/*.scss', 'dist/js/*.js', 'src/script/js/*.js'], gulp.parallel('uglifyhtml', 'comfilesass', 'uglify', 'babeljs'));
})