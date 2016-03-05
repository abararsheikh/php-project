import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';


// Options
const $ = gulpLoadPlugins({
  pattern: ['gulp-*', 'gulp.*', 'browser-sync']
});
const browserSync = $.browserSync.create();
const dir = {
  src: './src',
  dest: './public'
};

// HTML
//gulp.task('html', () => {
//  return gulp.src(`${dir.src}/app/**/*.+(html|css)`)
//      .pipe(gulp.dest(`${dir.dest}/app`));
//});
//// Styles
//gulp.task('styles', () => {
//  return gulp.src(`${dir.src}/**/*.sass`)
//      .pipe($.sass({
//        outputStyle: 'compressed'
//      }).on('error', $.sass.logError))
//      .pipe($.autoprefixer({browser: ['last 2 versions', '> 2%']}))
//      .pipe(gulp.dest(`${dir.dest}`))
//      .pipe(browserSync.stream());
//});
//
//
//// Build
//gulp.task('build', ['html', 'ts', 'styles'], () => {
//  return gulp.src(`${dir.src}/*.html`)
//    .pipe($.useref())
//    .pipe($.if('*.css', $.minifyCss()))
//    .pipe($.if('*.css', $.autoprefixer()))
//    .pipe(gulp.dest(dir.dest));
//});
//
//// Browser Sync
//gulp.task('serve', ['html', 'ts', 'styles'], () => {
//  browserSync.init({
//    proxy: 'php.project',
//    port: 3000
//  });
//
//  gulp.watch(`${dir.src}/**/*.sass`, ['styles']);
//  gulp.watch(`${dir.src}/**/*.ts`, ['ts']);
//  gulp.watch(`${dir.src}/**/*.html`, ['html']);
//  gulp.watch(`${dir.dest}/**/*.html`).on('change', browserSync.reload);
//});
