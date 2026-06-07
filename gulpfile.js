const gulp = require('gulp');
const clean = require('gulp-clean');
const htmlmin = require('gulp-htmlmin');
const cleanCSS = require('gulp-clean-css');
const through2 = require('through2');

const noFooterPages = [
  '/funny.html',
  '/404.html',
  '/patreon-notice.html',
  '/support.html',
  '/tools/calculator.html'
];
const footer = `<footer id="footer">
  <section class="logo">
  <img src="/img/general/ButterDogCo%20Wide%20Logo.png" alt="ButterDogCo Logo (Wide)" class="logo" loading="lazy">
  </section>
  <section class="links">
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/applications">Apps</a></li>
      <li><a href="/news">News</a></li>
      <li><a href="/about">About</a></li>
    </ul>
    <img src="/img/general/ButterDogCo%20Wide%20Logo.png" alt="ButterDogCo Logo (Wide)" class="logo" loading="lazy" tabindex="0" role="button" aria-label="Funny secret">
    <ul>
      <li><a href="/pp">Privacy Policy</a></li>
      <li><a href="/tos">Terms of Use</a></li>
    </ul>
  </section>
</footer>`;

function cleanDist() {
  return gulp
    .src('dist', { read: false, allowEmpty: true })
    .pipe(clean());
}

function buildHtml() {
  return gulp
    .src('docs/**/*.html', { base: 'docs' })
    .pipe(through2.obj(function (file, _, cb) {
      const relativePath = '/' + file.relative.replace(/\\/g, '/');
      if (noFooterPages.includes(relativePath)) {
        return cb(null, file);
      }
      if (file.isBuffer()) {
        const contents = file.contents.toString();
        const withFooter = contents.replace('</body>', `${footer}</body>`);
        file.contents = Buffer.from(withFooter);
      }
      cb(null, file);
    }))
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
    .src(['docs/**/*', '!docs/**/*.html'], { base: 'docs', encoding: false })
    .pipe(gulp.dest('dist'));
}

gulp.task('build', 
  gulp.series(
    cleanDist,
    gulp.parallel(buildHtml, minifyCss, copyOtherFiles)
  )
);