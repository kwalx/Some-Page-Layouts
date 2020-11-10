import gulp from 'gulp';
import babel from 'gulp-babel';
import postcss from 'gulp-postcss';
import replace from 'gulp-replace';
import rename from 'gulp-rename';
import concat from 'gulp-concat';
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

// Libs css

export const libs_css = () => {
  return gulp
    .src('node_modules/@glidejs/glide/dist/css/glide.core.css')
    .pipe(gulp.dest('src/css/libs'))
    .pipe(sync.stream({ once: true }));
};

// Styles

export const styles = () => {
  return gulp
    .src('src/css/index.css')
    .pipe(postcss([ pimport, minmax, autoprefixer, csso ]))
    .pipe(replace(/\.\.\//g, ''))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist'))
    .pipe(sync.stream());
};

// Scripts

export const scripts = () => {
  return gulp
    .src('src/js/index.js')
    .pipe(babel())
    .pipe(terser())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist'))
    .pipe(sync.stream());
};

// Libs js

export const libs_js = () => {
  return gulp
    .src([
      'node_modules/focus-visible/dist/focus-visible.js',
      'node_modules/@glidejs/glide/dist/glide.js'
    ])
    .pipe(concat('libs.min.js'))
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
  gulp.watch('src/*html', gulp.series(html));
  gulp.watch('src/css/**/*.css', gulp.series(styles));
  gulp.watch('src/js/**/*.js', gulp.series(scripts));
  gulp.watch([ 'src/fonts/**/*', 'src/img/**/*' ], gulp.series(copy));
};

// Dafualt

export default gulp.series(
  libs_css,
  gulp.parallel(html, styles, scripts, libs_js, copy),
  gulp.parallel(watch, server)
);
