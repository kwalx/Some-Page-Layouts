import gulp from 'gulp';
import babel from 'gulp-babel';
import postcss from 'gulp-postcss';
import rename from 'gulp-rename';
import rigger from 'gulp-rigger';
import concat from 'gulp-concat';
import htmlmin from 'gulp-htmlmin';
import terser from 'gulp-terser';
import imagemin from 'gulp-imagemin';
import cache from 'gulp-cache';
import pimport from 'postcss-import';
import minmax from 'postcss-media-minmax';
import autoprefixer from 'autoprefixer';
import csso from 'postcss-csso';
import sync from 'browser-sync';

// HTML

export const html = () => {
  return gulp
    .src('src/*.html')
    .pipe(rigger())
    .pipe(
      htmlmin({
        removeComments: true,
        collapseWhitespace: true
      })
    )
    .pipe(gulp.dest('dist'));
};

export const reload_html = () => {
  return gulp.src([ 'src/*.html', 'src/includes/*.html' ]).pipe(sync.stream());
};

// Libs css

export const libs_css = () => {
  return gulp
    .src('node_modules/@glidejs/glide/dist/css/glide.core.css')
    .pipe(rename('libs.css'))
    .pipe(gulp.dest('src/css/libs'))
    .pipe(sync.stream({ once: true }));
};

// Styles

export const styles = () => {
  return gulp
    .src([ 'src/css/index.css', 'src/css/gallery.css', 'src/css/projects.css' ])
    .pipe(postcss([ pimport, minmax, autoprefixer, csso ]))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist/css'))
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

// Images

export const images = () => {
  return gulp
    .src('src/img/**/*.+(png|jpg|gif|svg)')
    .pipe(
      cache(
        imagemin([
          imagemin.gifsicle({ interlaced: true }),
          imagemin.mozjpeg({ quality: 75, progressive: true }),
          imagemin.optipng({ optimizationLevel: 5 }),
          imagemin.svgo({
            plugins: [ { removeViewBox: true }, { cleanupIDs: false } ]
          })
        ])
      )
    )
    .pipe(gulp.dest('dist/img'))
    .pipe(sync.stream());
};

// Copy

export const copy = () => {
  return gulp
    .src([ 'src/fonts/**/*', 'src/img/**/*.webp' ], { base: 'src' })
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
  gulp.watch('src/includes/*.html', gulp.series(reload_html, html));
  gulp.watch('src/*.html', gulp.series(html, reload_html));
  gulp.watch('src/css/**/*.css', gulp.series(styles));
  gulp.watch('src/js/**/*.js', gulp.series(scripts));
  gulp.watch('src/img/**/*', gulp.series(images));
  gulp.watch([ 'src/fonts/**/*' ], gulp.series(copy));
};

// Dafualt

export default gulp.series(
  libs_css,
  gulp.parallel(html, reload_html, styles, scripts, libs_js, images, copy),
  gulp.parallel(watch, server)
);
