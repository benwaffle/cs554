const gulp = require('gulp')
const cleanCSS = require('gulp-clean-css')
const sass = require('gulp-sass')
const concat = require('gulp-concat')

const scssFiles = 'styles/**/*.scss'
const js = [
  'node_modules/jquery/dist/jquery.min.js',
  'node_modules/bootstrap/dist/js/bootstrap.min.js',
]

gulp.task('css', () => {
  return gulp.src(scssFiles)
    .pipe(sass())
    .pipe(cleanCSS())
    .pipe(concat('style.min.css'))
    .pipe(gulp.dest('public/css'))
})

gulp.task('js', () => {
  return gulp.src(js)
    .pipe(gulp.dest('public/js'))
})

gulp.task('watch', () => {
  gulp.watch(scssFiles, gulp.series(['css', 'js']))
})

gulp.task('default', gulp.parallel(['css', 'js']))