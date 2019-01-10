import gulp from 'gulp';
import browserSync from 'browser-sync';
import sass from 'gulp-sass';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import postcssGapProperties from 'postcss-gap-properties';

const server = browserSync.create();

sass.compiler = require('node-sass');

function css() {
  return (
    gulp
    .src("./src/scss/**/*.scss")
    .pipe(sass({
      outputStyle: 'expanded'
    }))
    .on("error", sass.logError)
    .pipe(postcss([
      postcssGapProperties(),
      autoprefixer({
        browsers: ['last 2 major versions', 'ie >= 11'],
        grid: true,
        cascade: false
      })
    ]))
    .pipe(gulp.dest("./html/css"))
    .pipe(server.stream())
  );
}

function watch(){
  gulp.watch("./html/*.html", reload);
  gulp.watch('./src/scss/*.scss', css);
}

function reload(done) {
  server.reload();
  done();
}

function serve(done) {
  server.init({
    server: {
      baseDir: 'html'
    }
  });
  done();
}

const dev = gulp.parallel(serve, css, watch);
export default dev;
