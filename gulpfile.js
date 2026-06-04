const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');
const cleanCSS = require('gulp-clean-css');

function minifyHtml() {
  return gulp
    .src('docs/**/*.html', { base: 'docs' })
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true,
      minifyJS: true,
      minifyCSS: true
    }))
    .pipe(gulp.dest('dist'));
}

function minifyCss() {
  return gulp
    .src('docs/**/*.css', { base: 'docs' })
    .pipe(cleanCSS())
    .pipe(gulp.dest('dist'));
}

function copyOtherFiles() {
  return gulp
    .src(['docs/**/*', '!docs/**/*.html', '!docs/**/*.css'], { base: 'docs', encoding: false })
    .pipe(gulp.dest('dist'));
}

gulp.task('build', gulp.parallel(minifyHtml, minifyCss, copyOtherFiles));