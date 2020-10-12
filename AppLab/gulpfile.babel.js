import gulp from 'gulp';
import babel from 'gulp-babel';
import postcss from 'gulp-postcss';
import replace from 'gulp-replace';
import htmlmin from 'gulp-htmlmin';
import terser from 'gulp-terser';
import pimport from 'postcss-import';
import minmax from 'postcss-media-minmax';
import autoprefixer from 'autoprefixer';
import csso from 'postcss-csso';
import sync from 'browser-sync';

// HTML

export const html = () => {
  return gulp
    .src('src/*.html')
    .pipe(
      htmlmin({
        removeComments: true,
        collapseWhitespace: true
      })
    )
    .pipe(gulp.dest('dist'))
    .pipe(sync.stream());
};

// Styles

export const styles = () => {
  return gulp
    .src('src/css/index.css')
    .pipe(postcss([ pimport, minmax, autoprefixer, csso ]))
    .pipe(replace(/\.\.\//g, ''))
    .pipe(gulp.dest('dist'))
    .pipe(sync.stream());
};

// Scripts

export const scripts = () => {
  return gulp
    .src('src/js/index.js')
    .pipe(babel())
    .pipe(terser())
    .pipe(gulp.dest('dist'))
    .pipe(sync.stream());
};

// Copy

export const copy = () => {
  return gulp
    .src([ 'src/fonts/**/*', 'src/img/**/*' ], { base: 'src' })
    .pipe(gulp.dest('dist'))
    .pipe(sync.stream({ once: true }));
};

// Paths

export const paths = () => {
  return gulp
    .src('dist/*.html')
    .pipe(replace(/(<link rel="stylesheet" href=")css\/(index.css">)/, '$1$2'))
    .pipe(replace(/(<script src=")js\/(index.js">)/, '$1$2'))
    .pipe(gulp.dest('dist'));
};

// Server

export const server = () => {
  sync.init({
    ui: false,
    notify: false,
    server: {
      baseDir: 'dist'
    }
  });
};

// Watch

export const watch = () => {
  gulp.watch('src/*html', gulp.series(html, paths));
  gulp.watch('src/css/**/*.css', gulp.series(styles));
  gulp.watch('src/js/**/*.js', gulp.series(scripts));
  gulp.watch([ 'src/fonts/**/*', 'src/img/**/*' ], gulp.series(copy));
};

// Dafualt

export default gulp.series(
  gulp.parallel(html, styles, scripts, copy),
  paths,
  gulp.parallel(watch, server)
);
