(function(){
  'use strict';

  var gulp = require('gulp'),
      concat = require('gulp-concat'),
      less = require('gulp-less'),
      ngAnnotate = require('gulp-ng-annotate');

  gulp.task('build', function() {
    gulp.src('./src/*.js')
      .pipe(concat('ng-panel.js'))
      .pipe(ngAnnotate())
      .pipe(gulp.dest('./dist/'));

    gulp.src('./src/*.less')
      .pipe(less())
      .pipe(gulp.dest('./dist/'));
  });

})();
