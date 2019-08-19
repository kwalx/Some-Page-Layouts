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

gulp.task('clean', (done) => {
  del.sync(config.build);
  del.sync(`${config.src}/assets/`);
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
        errorHandler: notify.onError((err) => {
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
  const sassStyleFiles = [ `${config.src}/sass/main.sass` ];

  return gulp
    .src(sassStyleFiles)
    .pipe(
      plumber({
        errorHandler: notify.onError((err) => {
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
    .pipe(postcss([ autoprefixer('> 0.1%') ]))
    .pipe(concat('main.css'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(`${config.src}/assets/css`));
});

gulp.task('sass:ie', () => {
  const sassIEStyleFiles = [ `${config.src}/sass/ie/ie9.sass` ];

  return gulp
    .src(sassIEStyleFiles)
    .pipe(
      plumber({
        errorHandler: notify.onError((err) => {
          return {
            title: 'SASS IE ERROR!',
            message: err.message
          };
        })
      })
    )
    .pipe(sass())
    .pipe(csscomb())
    .pipe(sourcemaps.init())
    .pipe(postcss([ autoprefixer('> 0.1%') ]))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(`${config.src}/assets/css/ie`));
});

gulp.task('css:libs', () => {
  const cssFiles = [
    `${config.src}/libs/normalize-scss/normalize.css`,
    `${config.src}/libs/owl.carousel/dist/assets/owl.carousel.css`
  ];

  return gulp
    .src(cssFiles)
    .pipe(concat('libs.css'))
    .pipe(gulp.dest(`${config.src}/assets/css`));
});

gulp.task('css:ie', () => {
  const plugins = [ cssnano() ];
  const cssIEfiles = [ `${config.src}/assets/css/ie/ie9.css` ];

  return gulp
    .src(cssIEfiles)
    .pipe(postcss(plugins))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(`${config.build}/css/ie`));
});

gulp.task('css', () => {
  const plugins = [ cssnano() ];
  const cssFiles = [
    `${config.src}/assets/css/libs.css`,
    `${config.src}/assets/css/main.css`
  ];

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
  const jsFiles = [ `${config.src}/js/main.js` ];

  return gulp
    .src(jsFiles)
    .pipe(sourcemaps.init())
    .pipe(
      plumber({
        errorHandler: notify.onError((err) => {
          return {
            title: 'JS ERROR!',
            message: err.message
          };
        })
      })
    )
    .pipe(
      babel({
        presets: [ '@babel/env' ]
      })
    )
    .pipe(concat('main.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(`${config.src}/assets/js`));
});

gulp.task('js:libs', () => {
  let jsLibs = [
    `${config.src}/libs/jquery/dist/jquery.js`,
    `${config.src}/libs/owl.carousel/dist/owl.carousel.js`
  ];

  return gulp
    .src(jsLibs)
    .pipe(concat('libs.js'))
    .pipe(gulp.dest(`${config.src}/assets/js`));
});

gulp.task('js', () => {
  let jsFiles = [
    `${config.src}/assets/js/libs.js`,
    `${config.src}/assets/js/main.js`
  ];

  return gulp
    .src(jsFiles)
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
    gulp.parallel('pug', 'sass', 'sass:ie', 'css:libs', 'babel', 'js:libs'),
    gulp.parallel('html', 'css', 'css:ie', 'js', 'img', 'fonts')
  )
);

gulp.task('watch', () => {
  gulp.watch(`${config.src}/pug/**/*.pug`, gulp.series('pug', 'html'));
  gulp.watch(`${config.src}/sass/**/*.sass`, gulp.series('sass', 'css'));
  gulp.watch(
    `${config.src}/sass/ie/**/*.sass`,
    gulp.series('sass:ie', 'css:ie')
  );
  gulp.watch(`${config.src}/js/**/*.js`, gulp.series('babel', 'js'));
  gulp.watch(`${config.src}/img/**/*`, gulp.series('img'));
  gulp.watch(`${config.src}/fonts/**/*`, gulp.series('fonts'));
});

gulp.task('default', gulp.series('build', gulp.parallel('serve', 'watch')));
