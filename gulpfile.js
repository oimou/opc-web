"use strict";

var gulp = require("gulp");
var browserify = require("browserify");
var babelify = require("babelify");
var source = require("vinyl-source-stream");

gulp.task("browserify", function() {
  browserify("./public/javascripts/index.jsx", {
    debug: true
  })
    .transform(babelify)
    .bundle()
    .on("error", function (err) {
      console.log("Error : " + err.message);
    })
    .pipe(source("bundle.js"))
    .pipe(gulp.dest("./public/javascripts"));
});

gulp.task("watch", function() {
  gulp.watch("./public/javascripts/*.jsx", ["browserify"]);
});

gulp.task("default", ["browserify", "watch"]);
