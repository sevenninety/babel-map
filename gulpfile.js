const gulp = require("gulp");
const babel = require("gulp-babel");
const sourcemaps = require("gulp-sourcemaps");

gulp.task("default", ["watch"]);

gulp.task("copy", () =>
    gulp
        .src("src/**/*.js")
        .pipe(sourcemaps.init())
        .pipe(
            babel({
                presets: ["env"]
            })
        )
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest("dist"))
);

gulp.task("watch", function() {
    gulp.watch("src/**/*.*", ["copy"]);
});
