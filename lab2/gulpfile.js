const gulp = require('gulp')
const cleanCSS = require('gulp-clean-css')
const sass = require('gulp-sass')
const concat = require('gulp-concat')

const scssFiles = 'styles/**/*.scss'

gulp.task('css', () => {
  return gulp.src(scssFiles)
    .pipe(sass())
    .pipe(cleanCSS())
    .pipe(concat('style.min.css'))
    .pipe(gulp.dest('public/css'))
})

gulp.task('watch', () => {
  gulp.watch(scssFiles, gulp.series(['css']))
})

gulp.task('default', gulp.parallel(['css']))