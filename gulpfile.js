const gulp = require('gulp');
const rename = require('gulp-rename');
const del = require('del');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const browserSync = require('browser-sync').create();

const pug = require('gulp-pug');
const htmlmin = require('gulp-htmlmin');

const sass = require('gulp-sass');
sass.compiler = require('node-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const csscomb = require('gulp-csscomb');
const cssnano = require('cssnano');

const babel = require('gulp-babel');
const uglify = require('gulp-uglify');

const config = {
  src: 'src',
  build: 'public'
};

gulp.task('clean', done => {
  del.sync(config.build);
  done();
});

gulp.task('serve', function() {
  browserSync.init({
    server: {
      baseDir: config.build,
      index: 'index.html'
    }
  });
  browserSync.watch(`${config.build}/**/*.*`).on('change', browserSync.reload);
});

/**
 * HTML
 */
gulp.task('pug', () => {
  return gulp
    .src(`${config.src}/pug/layout/*.pug`)
    .pipe(
      plumber({
        errorHandler: notify.onError(err => {
          return {
            title: 'PUG ERROR!',
            message: err.message
          };
        })
      })
    )
    .pipe(
      pug({
        pretty: true
      })
    )
    .pipe(gulp.dest(`${config.src}/assets/`));
});

gulp.task('html', () => {
  return gulp
    .src(`${config.src}/assets/*.html`)
    .pipe(
      htmlmin({
        collapseWhitespace: true,
        removeComments: true
      })
    )
    .pipe(gulp.dest(config.build));
});

/**
 * Styles
 */
gulp.task('sass', () => {
  const styleFiles = [`${config.src}/sass/main.sass`];

  return gulp
    .src(styleFiles)
    .pipe(
      plumber({
        errorHandler: notify.onError(err => {
          return {
            title: 'SASS ERROR!',
            message: err.message
          };
        })
      })
    )
    .pipe(sass())
    .pipe(csscomb())
    .pipe(sourcemaps.init())
    .pipe(postcss([autoprefixer('> 0.1%')]))
    .pipe(concat('all.css'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(`${config.src}/assets/css`));
});

gulp.task('css', () => {
  const plugins = [cssnano()];

  return gulp
    .src(`${config.src}/assets/css/*.css`)
    .pipe(postcss(plugins))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(`${config.build}/css`));
});

/**
 * Scripts
 */
gulp.task('babel', () => {
  const jsFiles = [
    // `${config.src}/libs/jquery/dist/jquery.js`, // Include later
    `${config.src}/js/main.js`
  ];

  return gulp
    .src(jsFiles)
    .pipe(sourcemaps.init())
    .pipe(
      plumber({
        errorHandler: notify.onError(err => {
          return {
            title: 'JS ERROR!',
            message: err.message
          };
        })
      })
    )
    .pipe(
      babel({
        presets: ['@babel/env']
      })
    )
    .pipe(concat('all.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(`${config.src}/assets/js`));
});

gulp.task('js', () => {
  return gulp
    .src(`${config.src}/assets/js/*.js`)
    .pipe(
      uglify({
        toplevel: true
      })
    )
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(`${config.build}/js`));
});

/**
 * Image move
 */
gulp.task('img', () => {
  return gulp.src(`${config.src}/img/*`).pipe(gulp.dest(`${config.build}/img`));
});

/**
 * Fonts move
 */
gulp.task('fonts', () => {
  return gulp
    .src(`${config.src}/fonts/**/*`)
    .pipe(gulp.dest(`${config.build}/fonts`));
});

/**
 * Build
 */
gulp.task(
  'build',
  gulp.series(
    'clean',
    gulp.parallel('pug', 'sass', 'babel'),
    gulp.parallel('html', 'css', 'js', 'img', 'fonts')
  )
);

gulp.task('watch', () => {
  gulp.watch(`${config.src}/pug/**/*.pug`, gulp.series('pug', 'html'));
  gulp.watch(`${config.src}/sass/**/*.sass`, gulp.series('sass', 'css'));
  gulp.watch(`${config.src}/js/**/*.js`, gulp.series('babel', 'js'));
  gulp.watch(`${config.src}/img/**/*`, gulp.series('img'));
  gulp.watch(`${config.src}/fonts/**/*`, gulp.series('fonts'));
});

gulp.task('default', gulp.series('build', gulp.parallel('serve', 'watch')));
