const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const { watch } = require('gulp');
const cleanCSS = require('gulp-clean-css');
const browserSync = require('browser-sync').create();
const sourcemaps = require('gulp-sourcemaps');
const gcmq = require('gulp-group-css-media-queries');
const preproc = require('gulp-less');

const config = {
  src: './src',
  css : {
    watch:'/precss/**/*.less',
    src: '/precss/style.less',
    dest: '/css'
  },
  html:{
    src: '/index.html'
  }
}

gulp.task('build', function(done){ 
  gulp.src(config.src + config.css.src) //получили в память gulp
  .pipe(sourcemaps.init())
  .pipe(preproc())
  .pipe(gcmq())
  .pipe(autoprefixer({
    //browsers: ['last 2 versions'],
    browsers: ['> 0.1%'],
    cascade: false
}))
  .pipe(cleanCSS())
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest(config.src + config.css.dest)) // преобразованные получить в css - папку
  .pipe(browserSync.reload({stream: true}));
  done();
});

gulp.task('watch', function(){ 
  gulp.watch(config.src + config.css.watch, gulp.series('build'));
  gulp.watch(config.src + config.html.src, browserSync.reload);
});

// Static server
gulp.task('serve', function() {
  browserSync.init({
      server: {
          baseDir: config.src
      }
  });
  browserSync.watch(config.src,browserSync.reload)
});

gulp.task('default', gulp.parallel('watch','serve'));