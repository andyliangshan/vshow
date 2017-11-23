/*!
 * gulp est
 */
import gulp from 'gulp';
import path from 'path';
import webpack, { DefinePlugin } from 'webpack';
import fs from 'fs';
import config from './server/config/system';

// Load plugins
const $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'del', 'run-sequence'],
});

const handleError = $.notify.onError({
  title: 'Gulp Error: <%= error.plugin %>',
  message: '<%= error.name %>: <%= error.toString() %>',
});

const gulpConfig = {
  src: 'public/assets',
  dev: 'public/build',
  prod: 'public/dist',
  views: 'server/views',
};

// Styles
gulp.task('styles', () => {
  return gulp.src(['public/assets/styles/**/*.less',
      '!public/assets/styles/components/',
      '!public/assets/styles/header.less',
      '!public/assets/styles/footer.less',
      '!public/assets/styles/bsCommon.less',
      '!public/assets/styles/noresponse.less'], {style: 'expanded'})
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.less())
    .pipe($.csscomb())
    .pipe($.autoprefixer('> 1%', 'last 2 version', 'Firefox ESR', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
    .pipe($.rename({suffix: '.dev'}))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('public/build/styles'))
    //.pipe($.notify({message: 'Styles task complete'}));
});

// Scripts
gulp.task('scripts', () => {
  return gulp.src(['public/assets/scripts/**/*.js',
      '!public/assets/scripts/global/bwuem.js',
      '!public/assets/scripts/global/carousel.js',
      '!public/assets/scripts/global/tjshare.js'])
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    // .pipe($.jshint('.jshintrc'))
    // .pipe($.jshint.reporter('default'))
    .pipe($.babel())
    .pipe($.rename({suffix: '.dev'}))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('public/build/scripts'))
    //.pipe($.notify({message: 'Scripts task complete'}));
});

// Images
gulp.task('imagemin', () => {
  return gulp.src('public/assets/images/**/*').pipe(gulp.dest('public/build/images'))
    // gulp.src('public/assets/images/**/*')
    // .pipe(/*$.cache(*/$.imagemin({
    //   optimizationLevel: 3,
    //   progressive: true,
    //   interlaced: true,
    //   // don't remove IDs from SVGs, they are often used
    //   // as hooks for embedding and styling
    //   svgoPlugins: [{cleanupIDs: false}],
    // }))/*)*/
    // .pipe(gulp.dest('public/build/images'))
});

// Fonts
gulp.task('fonts', () => {
  return gulp.src('public/bower_components/bootstrap-less/fonts/**/*')
    .pipe(gulp.dest('public/build/css/'))
    .pipe(gulp.dest('public/dist/fonts/'))
    //.pipe($.notify({message: 'fonts copy task complete'}));
});

// CustomFonts
gulp.task('customFonts', () => {
  return gulp.src('public/assets/fonts/**/*')
    .pipe(gulp.dest('public/build/css/'))
    .pipe(gulp.dest('public/dist/css/'))
    //.pipe($.notify({message: 'fonts copy and reversion task complete'}));
});

// Clean
gulp.task('clean', () => {
  return $.del([gulpConfig.dev, gulpConfig.prod]);
});

// ES6 webpack
gulp.task('es6', () => {
  gulp.src(['pubic/scripts/**/*.js'])
    .pipe($.webpack({
      entry: {
        home: 'public/scripts/home.js',
      },
      devtool: config.debug ? 'source-map' : false,
      output: {
        filename: '[name].js',
      },
      watch: config.debug,
      module: {
        loaders: [{
          test: /\.js$/, loader: 'babel-loader',
        }],
      },
      plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new DefinePlugin(config.globals),
        ...(!config.debug && [
          new webpack.optimize.DedupePlugin(),
          new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}}),
          new webpack.optimize.AggressiveMergingPlugin(),
        ]),
      ],
    }, null, (err, stats) => {
      if (!config.debug) {
        fs.writeFile('stats.json', JSON.stringify(stats.toJson()), 'utf8', (error) => {
          if (error) {
            console.log(error);
          }
        });
      } else {
        console.log(err);
      }
    }).on('error', handleError))
    .pipe(gulp.dest('public/dist/scripts'));
});

gulp.task('develop', async () => {
  $.livereload.listen();
  await $.wait(2);
  return $.nodemon({
    script: 'app.js',
    ext: 'js',
    watch: ['server', 'app.js'],
    ignore: 'public',
    stdout: false,
    delay: 1,
    execMap: {
      js: 'babel-node',
    },
  }).on('readable', function onReadable() {
    this.stdout.pipe(process.stdout);
    this.stderr.pipe(process.stderr);
  });
});

// Watch
gulp.task('watch', () => {
  //gulp.watch('public/assets/styles/**/*.less', ['styles']);
  gulp.watch('public/assets/styles/**/*.less', file => {
    try {
      const relPath = file.path.substr(path.join(__dirname, './public/assets/styles/').length);// usa/home.less
      const relDir = relPath.split('/').slice(0, -1).join('/');// /usa
      return gulp.src(`public/assets/styles/${relPath}`)
        .pipe($.plumber())
        .pipe($.sourcemaps.init())
        .pipe($.less())
        .pipe($.csscomb())
        .pipe($.autoprefixer('> 1%', 'last 2 version', 'Firefox ESR', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
        .pipe($.rename({suffix: '.dev'}))
        .pipe($.sourcemaps.write('.'))
        .pipe(gulp.dest(`./public/build/styles/${relDir}`))
        .pipe($.notify({message: ' watch less copy and reversion task complete'}));
    } catch (err) {
      console.log(err);
    }
  });
  gulp.watch('public/assets/scripts/**/*.js', ['scripts']);
  gulp.watch('public/assets/fonts/**/*', ['fonts']);
});

gulp.task('default', () => {
  $.runSequence(
    'clean',
    'styles',
    'scripts',
    'imagemin',
    'fonts',
    'customFonts',
    'develop',
    'watch'
  );
});
gulp.task('build', () => {
  $.runSequence(
    'clean',
    'styles',
    'scripts',
    'imagemin',
    'fonts',
    'customFonts'
  );
});
