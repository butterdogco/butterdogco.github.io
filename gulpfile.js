const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');
const cleanCSS = require('gulp-clean-css');

gulp.task('build', () => {
  return gulp
    .src('docs/**/*')
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true,
      minifyJS: true,
      minifyCSS: true
    }))
    .pipe(cleanCSS())
    .pipe(gulp.dest('dist'));
});