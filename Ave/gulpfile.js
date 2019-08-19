const gulp = require('gulp');
const rename = require('gulp-rename');
const concat = require('gulp-concat');
const del = require('del');
const rigger = require('gulp-rigger');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();

const htmlmin = require('gulp-htmlmin');

const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const csscomb = require('gulp-csscomb');
const cssnano = require('cssnano');

const config = {
  src: 'src',
  build: 'build',
  public: 'public',
  libs: 'node_modules'
};

/**
 * Error notifier function
 */
function errorNotifier(errTitle) {
  return {
    errorHandler: notify.onError((err) => {
      return {
        title: errTitle,
        message: err.message
      };
    })
  };
}

/**
 * Browser-sync
 */
gulp.task('bs-reload', function() {
  browserSync.init({
    server: {
      baseDir: config.build,
      index: 'index.html'
    }
    // online: true,
    // tunnel: true,
    // logLevel: 'info'
  });

  browserSync.watch(`${config.build}/**/*.*`).on('change', browserSync.reload);
});

/**
 * Clean
 */
gulp.task('clean', (done) => {
  del.sync(config.build);
  del.sync(config.public);
  done();
});

/**
 * HTML
 */
gulp.task('html', () => {
  return gulp
    .src(`${config.src}/pages/layout/**/*.html`)
    .pipe(rigger())
    .pipe(gulp.dest(`${config.build}`));
});

/**
 * SCSS
 */
gulp.task('scss', () => {
  const scssFiles = [
    `${config.src}/scss/fonts.scss`,
    `${config.src}/scss/variables.scss`,
    `${config.src}/main.scss`
  ];

  return gulp
    .src(`${config.src}/scss/**/*.scss`)
    .pipe(sourcemaps.init())
    .pipe(plumber(errorNotifier('SCSS Errror!')))
    .pipe(sass())
    .pipe(concat('main.css'))
    .pipe(postcss([ autoprefixer('> 0.1%') ]))
    .pipe(csscomb())
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(`${config.build}/css`));
});

/**
 * CSS Libs
 */
gulp.task('css:libs', () => {
  const cssFiles = [ `${config.libs}/normalize.css/normalize.css` ];

  return gulp
    .src(cssFiles)
    .pipe(concat('libs.css'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(`${config.build}/css/libs`));
});

/**
 * HTML public (minifying)
 */
gulp.task('html:public', () => {
  return gulp
    .src(`${config.build}/*.html`)
    .pipe(
      htmlmin({
        collapseWhitespace: true,
        removeComments: true
      })
    )
    .pipe(gulp.dest(`${config.public}`));
});

/**
 * CSS public (minifying)
 */
gulp.task('css:public', () => {
  const plugins = [ cssnano() ];

  return gulp
    .src(`${config.build}/css/**/*.css`)
    .pipe(postcss(plugins))
    .pipe(gulp.dest(`${config.public}/css`));
});

/**
 * Images
 */
gulp.task('img', () => {
  return gulp.src(`${config.src}/img/*`).pipe(gulp.dest(`${config.build}/img`));
});

/**
 * Images public
 */
gulp.task('img:public', () => {
  return gulp
    .src(`${config.build}/img/*`)
    .pipe(gulp.dest(`${config.public}/img`));
});

/**
 * Fonts
 */
gulp.task('fonts', () => {
  return gulp
    .src(`${config.src}/fonts/**/*`)
    .pipe(gulp.dest(`${config.build}/fonts`));
});

/**
 * Fonts public
 */
gulp.task('fonts:public', () => {
  return gulp
    .src(`${config.build}/fonts/**/*`)
    .pipe(gulp.dest(`${config.public}/fonts`));
});

/**
 * Watch
 */
gulp.task('watch', () => {
  gulp.watch(`${config.src}/pages/**/*.html`, gulp.series('html'));
  gulp.watch(`${config.src}/scss/**/*.scss`, gulp.series('scss'));
  gulp.watch(`${config.src}/img/**/*`, gulp.series('img'));
  gulp.watch(`${config.src}/fonts/**/*`, gulp.series('fonts'));
});

/**
 * Build
 */
gulp.task(
  'build',
  gulp.series('clean', 'html', 'scss', 'img', 'css:libs', 'fonts')
);

/**
 * Default
 */
gulp.task('default', gulp.series('build', gulp.parallel('bs-reload', 'watch')));

/**
 * Public
 */
gulp.task(
  'public',
  gulp.series(
    'build',
    'html:public',
    'css:public',
    'img:public',
    'fonts:public'
  )
);
