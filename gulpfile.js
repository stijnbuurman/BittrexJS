"use strict";

//******************************************************************************
//* DEPENDENCIES
//******************************************************************************

var gulp        = require("gulp"),
    browserify  = require("browserify"),
    source      = require("vinyl-source-stream"),
    buffer      = require("vinyl-buffer"),
    gulpTslint  = require("gulp-tslint"),
    tslint      = require("tslint"),
    tsc         = require("gulp-typescript"),
    sourcemaps  = require("gulp-sourcemaps"),
    uglify      = require("gulp-uglify"),
    rename      = require("gulp-rename"),
    runSequence = require("run-sequence"),
    del         = require('del');

//******************************************************************************
//* CLEAN
//******************************************************************************
gulp.task("clean", function() {
    return del([
        "lib",
        "es",
        "amd"
    ]);
});

//******************************************************************************
//* LINT
//******************************************************************************
gulp.task("lint", function() {

    var program = tslint.Linter.createProgram("./tsconfig.json");

    return gulp.src([
        "src/**/**.ts"
    ])
        .pipe(gulpTslint({ program }))
        .pipe(gulpTslint.report());

});

//******************************************************************************
//* BUILD
//******************************************************************************
var tsLibProject = tsc.createProject("tsconfig.json", { module : "commonjs", typescript: require("typescript") });

gulp.task("build-lib", function() {
    return gulp.src([
        "src/**/*.ts"
    ])
        .pipe(tsLibProject())
        .on("error", function (err) {
            process.exit(1);
        })
        .js.pipe(gulp.dest("lib/"));
});

var tsAmdProject = tsc.createProject("tsconfig.json", { module : "amd", typescript: require("typescript") });

gulp.task("build-amd", function() {
    return gulp.src([
        "src/**/*.ts"
    ])
        .pipe(tsAmdProject())
        .on("error", function (err) {
            process.exit(1);
        })
        .js.pipe(gulp.dest("amd/"));
});

var tsEsProject = tsc.createProject("tsconfig.json", { module : "es2015", typescript: require("typescript") });

gulp.task("build-es", function() {
    return gulp.src([
        "src/**/*.ts"
    ])
        .pipe(tsEsProject())
        .on("error", function (err) {
            process.exit(1);
        })
        .js.pipe(gulp.dest("es/"));
});

var tsDtsProject = tsc.createProject("tsconfig.json", {
    declaration: true,
    noResolve: false,
    typescript: require("typescript")
});

gulp.task("build-dts", function() {
    return gulp.src([
        "src/**/*.ts"
    ])
        .pipe(tsDtsProject())
        .on("error", function (err) {
            process.exit(1);
        })
        .dts.pipe(gulp.dest("dts"));

});

//******************************************************************************
//* DEFAULT
//******************************************************************************
gulp.task("build", function(cb) {
    runSequence(
        "lint",
        [
            "build-es",
            "build-lib",
            "build-amd",
            "build-dts"
        ],
        cb
    );
});

gulp.task("default", function (cb) {
    runSequence(
        "clean",
        "build",
        cb);
});