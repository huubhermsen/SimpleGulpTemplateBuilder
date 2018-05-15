const path = require("path");
const gulp = require("gulp");
const rimraf = require("rimraf");
const pug = require("gulp-pug");
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const babel = require("gulp-babel");
const watch = require("gulp-watch");
const plumber = require("gulp-plumber");
const { exec } = require("child_process");

const SRC_PATH = path.join(process.cwd(), "src");
const BUILD_PATH = path.join(process.cwd(), "dist");

gulp.task("clean", (cb) => {
  rimraf(BUILD_PATH, cb);
});

gulp.task("html", ["clean"], () => {
  return watch(`${SRC_PATH}/pug/**/*.pug`, { ignoreInitial: false })
    .pipe(plumber())
    .pipe(
      pug({
        pretty: true
      })
    )
    .pipe(gulp.dest(BUILD_PATH));
});

gulp.task("css", ["clean"], () => {
  return watch(`${SRC_PATH}/sass/**/*.scss`, { ignoreInitial: false })
    .pipe(plumber())
    .pipe(
      sass({
        includePaths: [`${SRC_PATH}/sass/core`],
        outputStyle: "expanded"
      })
    )
    .pipe(postcss([autoprefixer]))
    .pipe(gulp.dest(`${BUILD_PATH}/assets/css`));
});

gulp.task("javascript", ["clean"], () => {
  return watch(`${SRC_PATH}/javascript/**/*.js`, { ignoreInitial: false })
    .pipe(plumber())
    .pipe(
      babel({
        presets: ["env"]
      })
    )
    .pipe(gulp.dest(`${BUILD_PATH}/assets/js`));
});

gulp.task("serve", ["clean"], (cb) => {
  exec("npm run lite", (error) => {
    cb(error);
  });
});

gulp.task("default", ["clean", "html", "css", "javascript", "serve"]);
