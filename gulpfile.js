const gulp = require('gulp');
const argv = require('yargs').argv;
const browserSync = require('browser-sync').create();
const nunjucksRender = require('gulp-nunjucks-render');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const gulpif = require('gulp-if');
const autoprefixer = require('gulp-autoprefixer');
const csso = require('gulp-csso');
const rename = require('gulp-rename');
const gcmq = require('gulp-group-css-media-queries');
const webpackStream = require('webpack-stream');
const webpack = require('webpack');
const plumber = require('gulp-plumber');
const uglify = require('gulp-uglify');
const newer = require('gulp-newer');
const imagemin = require('gulp-imagemin');
const imageminJpegRecompress = require('imagemin-jpeg-recompress');
const pngquant = require('imagemin-pngquant');
const webp = require('gulp-webp');
const ttf2woff = require('gulp-ttf2woff');
const ttf2woff2 = require('gulp-ttf2woff2');
const fonter = require('gulp-fonter');
const del = require('del');
const hash = require('gulp-hash-filename');
const fs = require('fs');
const data = require('gulp-data');
const projectConfig = require('./projectСonfig.json');
const concat = require('gulp-concat');
const merge = require('merge-stream');

// Путь к JSON-файлу с данными
const dataPath = 'src/data/data.json';

/**
 * Path settings
 */
const path = projectConfig.path;

path.watch = {};

/**
 * Html path
 */
path.src.html[0] = path.src.srcPath + path.src.html[0];
path.src.html[1] = '!' + path.src.html[0].slice(0, -6) + '_*.html';
path.src.html[2] = '!' + path.src.srcPath + '/assets';
path.src.html[3] = '!' + path.src.srcPath + '/html';

path.dist.html = path.dist.distPath + path.dist.html;

path.watch.html = [];
path.watch.html[0] = path.src.html[0];

/**
 * Css path
 */
path.src.style[0] = path.src.srcPath + path.src.style[0];

path.dist.style = path.dist.distPath + path.dist.style;

path.watch.style = [];
path.watch.style[0] = path.src.style[0].replace(path.src.style[0].split('/').pop(), '**/*.sass');

/**
 * Js path
 */
path.src.script[0] = path.src.srcPath + path.src.script[0];

path.dist.script = path.dist.distPath + path.dist.script;

path.watch.script = [];
path.watch.script[0] = path.src.script[0].replace(path.src.script[0].split('/').pop(), '**/*.js');

/**
 * Libs path
 */
path.src.libs[0] = path.src.srcPath + path.src.libs[0];

path.dist.libs = path.dist.distPath + path.dist.libs;

path.watch.libs = [];

/**
 * Images path
 */
path.src.image[0] = path.src.srcPath + path.src.image[0];
path.src.image[1] = '!' + path.src.image[0].slice(0, -6) + 'svgIcons/*.svg';

path.dist.image = path.dist.distPath + path.dist.image;

path.watch.image = [];
path.watch.image[0] = path.src.image[0];
path.watch.image[1] = '!' + path.src.image[0].slice(0, -6) + 'svgIcons/*.svg';

/**
 * Fonts path
 */
path.src.font[0] = path.src.srcPath + path.src.font[0];
path.src.font[1] = '!' + path.src.font[0].slice(0, -6) + 'src/*.*';

path.dist.font = path.dist.distPath + path.dist.font;

path.watch.font = [];
path.watch.font[0] = path.src.font[0];
path.watch.font[1] = '!' + path.src.font[0].slice(0, -6) + 'src/*.*';

/**
 * Dev check
 */
const isDev = function () {
  return !argv.prod;
};

/**
 * Prod check
 */
const isProd = function () {
  return !!argv.prod;
};

/**
 * Serve
 */
function browsersync() {
  browserSync.init({
    open: true,
    server: path.dist.distPath,
  });
}

/**
 * Html
 */
function njk() {
  return gulp
    .src(path.src.html)
    .pipe(data(function () {
      return JSON.parse(fs.readFileSync(dataPath)); // Чтение JSON-файла
    }))
    .pipe(nunjucksRender({
      path: ['src/html'], // Путь к папке с шаблонами
    }))
    .pipe(gulp.dest(path.dist.html))
    .on('end', browserSync.reload);
}

/**
 * Style
 */
// function scss() {
//   return gulp
//     .src(path.src.style)
//     .pipe(gulpif(isDev(), sourcemaps.init()))
//     .pipe(sass())
//     .pipe(gulpif(isProd(), autoprefixer({ grid: true })))
//     .pipe(gulpif(isProd(), gcmq()))
//     .pipe(gulpif(isDev(), sourcemaps.write()))
//     .pipe(gulpif(isProd(), gulp.dest(path.dist.style)))
//     .pipe(gulpif(isProd(), csso()))
//     .pipe(rename({ suffix: '.min' }))
//     .pipe(gulp.dest(path.dist.style))
//     .pipe(browserSync.reload({ stream: true }));
// }

function scss() {
  // Обработка файлов в /assets/styles/libs/*.* (не объединять)
  const libsStream = gulp
    .src('src/assets/styles/libs/*.*') // Исходные файлы в папке libs
    .pipe(gulpif(isDev(), sourcemaps.init()))
    .pipe(sass())
    .pipe(gulpif(isProd(), autoprefixer({ grid: true })))
    .pipe(gulpif(isProd(), gcmq()))
    .pipe(gulpif(isDev(), sourcemaps.write()))
    .pipe(gulp.dest('dist/assets/css/libs')) // Сохраняем в папку libs


  // Обработка файлов в /assets/styles/*.* (объединить в один файл)
  const mainStream = gulp
    .src('src/assets/styles/main.sass') // Исходные файлы в корне styles
    .pipe(gulpif(isDev(), sourcemaps.init()))
    .pipe(sass())
    .pipe(gulpif(isProd(), autoprefixer({ grid: true })))
    .pipe(gulpif(isProd(), gcmq()))
    .pipe(concat('main.css')) // Объединяем все файлы в один main.css
    .pipe(gulpif(isDev(), sourcemaps.write()))
    .pipe(gulp.dest('dist/assets/css')) // Сохраняем в корень styles

  // Возвращаем объединенный поток
  return merge(libsStream, mainStream) // Объединяем два потока
    .pipe(browserSync.reload({ stream: true })); // Перезагрузка браузера
}

/**
 * Script
 */
const webpackConf = {
  mode: isDev() ? 'development' : 'production',
  devtool: isDev() ? 'eval-source-map' : false,
  optimization: {
    minimize: false,
  },
  output: {
    filename: 'app.js',
  },
  module: {
    rules: [],
  },
};

if (isProd()) {
  webpackConf.module.rules.push({
    test: /\.(js)$/,
    exclude: /(node_modules)/,
    loader: 'babel-loader',
  });
}

function script() {
  return gulp
    .src(path.src.script)
    .pipe(plumber())
    // .pipe(webpackStream(webpackConf, webpack))
    // .pipe(gulpif(isProd(), gulp.dest(path.dist.script)))
    // .pipe(gulpif(isProd(), uglify()))
    // .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(path.dist.script))
    .pipe(browserSync.reload({ stream: true }));
}

/**
 * Libs
 */
function libs() {
  return gulp
    .src(path.src.libs)
    // .pipe(plumber())
    // .pipe(webpackStream(webpackConf, webpack))
    // .pipe(gulpif(isProd(), gulp.dest(path.dist.libs)))
    // .pipe(gulpif(isProd(), uglify()))
    // .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(path.dist.libs))
  // .pipe(browserSync.reload({ stream: true }));
}

/**
 * Image min
 */
function imageMin() {
  return gulp
    .src(path.src.image)
    .pipe(newer(path.dist.image))
    .pipe(
      imagemin([
        imageminJpegRecompress({
          progressive: true,
          min: 50,
          max: 90,
          quality: ['high'],
        }),
        pngquant({
          speed: 5,
          quality: [0.6, 0.8],
        }),
        imagemin.svgo({
          plugins: [
            { removeViewBox: false },
            { removeUnusedNS: false },
            { removeUselessStrokeAndFill: false },
            { cleanupIDs: false },
            { removeComments: true },
            { removeEmptyAttrs: true },
            { removeEmptyText: true },
            { collapseGroups: true },
          ],
        }),
      ])
    )
    .pipe(gulp.dest(path.dist.image));
}

/**
 * Webp
 */
function webConverter() {
  return gulp
    .src(path.dist.image + '**/*.{png,jpg,jpeg}')
    .pipe(webp())
    .pipe(gulp.dest(path.dist.image));
}

const image = gulp.series(imageMin, webConverter, (done) => {
  browserSync.reload();
  done();
});

/**
 * Woff2 converter
 */
function ttf2woff2Converter() {
  return gulp
    .src(path.src.font[0].slice(0, -6) + 'src/*.ttf')
    .pipe(ttf2woff2())
    .pipe(gulp.dest(path.src.font[0].slice(0, -6)));
}

/**
 * Woff converter
 */
function ttf2woffConverter() {
  return gulp
    .src(path.src.font[0].slice(0, -6) + 'src/*.ttf')
    .pipe(ttf2woff())
    .pipe(gulp.dest(path.src.font[0].slice(0, -6)));
}

/**
 * Otf to ttf converter
 */
function otf2ttf() {
  return gulp
    .src(path.src.font[0].slice(0, -6) + 'src/*')
    .pipe(
      fonter({
        formats: ['ttf'],
      })
    )
    .pipe(gulp.dest(path.src.font[0].slice(0, -6) + 'src'));
}

const fontsConvert = gulp.series(otf2ttf, ttf2woff2Converter, ttf2woffConverter);
exports.fontsConvert = fontsConvert;

/**
 * Fonts
 */
function font() {
  return gulp
    .src(path.src.font)
    .pipe(gulp.dest(path.dist.font))
    .on('end', browserSync.reload);
}

/**
 * Clean
 */
function clean() {
  return del([path.dist.distPath]);
}

/**
 * Watch
 */
function watch() {
  gulp.watch(path.watch.html, njk);
  gulp.watch(path.watch.style, scss);
  gulp.watch('src/assets/styles/**/*.sass', scss);
  gulp.watch('src/assets/styles/libs/**/*.*', scss);
  gulp.watch(path.watch.script, script);
  gulp.watch(path.watch.libs, libs);
  gulp.watch(path.watch.image, image);
  gulp.watch(path.watch.font, font);
}

/**
 * Default task
 */
exports.default = gulp.series(
  clean,
  gulp.parallel(njk, scss, script, libs, image, font),
  gulp.parallel(browsersync, watch)
);