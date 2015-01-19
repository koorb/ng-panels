(function(){
  'use strict';

  var gulp = require('gulp'),
      concat = require('gulp-concat'),
      less = require('gulp-less'),
      ngAnnotate = require('gulp-ng-annotate');

  var paths = {
    scripts: './src/*.js',
    styles: './src/*.less',
    dest: './dist/'
  };

  gulp.task('scripts', function() {
    gulp.src(paths.scripts)
      .pipe(concat('ng-panels.js'))
      .pipe(ngAnnotate())
      .pipe(gulp.dest(paths.dest));
  });

  gulp.task('styles', function() {
    gulp.src(paths.styles)
      .pipe(less())
      .pipe(gulp.dest(paths.dest));
  });

  gulp.task('watch', function() {
    gulp.watch(paths.scripts, ['scripts']);
    gulp.watch(paths.styles, ['styles']);
  });

  gulp.task('default', ['scripts', 'styles']);

})();
