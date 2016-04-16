"use strict";

var gulp       = require('gulp');
var connect    = require('gulp-connect'); // Runs a local dev server
var open       = require('gulp-open'); // Open a URL in a webbrowser
var browserify = require('browserify'); // Bundles JS
var reactify   = require('reactify'); // Transforms React JSX to JS
var source     = require('vinyl-source-stream'); // Use conventional text stream with Gulp
var concat     = require('gulp-concat'); // concatenates files
var babelify   = require('babelify');

var config = {
  port: 8000,
  devBaseUrl: 'http://localhost',
  prodBase: process.env.PORT,
  paths: {
    html: './src/*.html',
    js: './src/**/*.js',
    css: [
      'node_modules/bootstrap/dist/css/bootstrap.min.css',
      'node_modules/bootstrap/dist/css/bootstrap-theme.min.css'
    ],
    dist: './dist',
    indexJs: './src/index.js'
  }
}

//Start a local development server

gulp.task('connect', function() {
  connect.server({
    root: ['dist'],
    port: config.port,
    livereload: true
  })
});

gulp.task('serveprod', function() {
  connect.server({
    root: ['dist'],
    port: process.env.PORT || config.port, // localhost:5000
    livereload: false
  });
});

gulp.task('open', ['connect'], function() {
  gulp.src('dist/index.html')
      .pipe(open({ uri: config.prodBase || config.devBaseUrl + ':' + config.port + '/' }))
});

// go get any html file and send it to our destination file and then reload using connect
gulp.task('html', function(){
  gulp.src(config.paths.html)
    .pipe(gulp.dest(config.paths.dist))
    .pipe(connect.reload());
})

gulp.task('js', function(){
  browserify(config.paths.indexJs)
    .transform(babelify, {presets: ["es2015", "react", "stage-0"]})
    .bundle()
    .on('error', console.error.bind(console))
    .pipe(source('bundle.js'))
    .pipe(gulp.dest(config.paths.dist + '/scripts'))
    .pipe(connect.reload())
})

gulp.task('css', function(){
  gulp.src(config.paths.css)
    .pipe(concat('bundle.css'))
    .pipe(gulp.dest(config.paths.dist + '/css'))
    .pipe(connect.reload())
})

//watching html, if anything change we change the html path
gulp.task('watch', function() {
   gulp.watch(config.paths.html, ['html']);
   gulp.watch(config.paths.js, ['js']);
});

//=====================

gulp.task('open', ['connect'], function() {
  gulp.src('dist/index.html')
      .pipe(open({ uri: config.devBaseUrl + ':' + config.port + '/' }))
});

// go get any html file and send it to our destination file and then reload using connect
gulp.task('html', function(){
  gulp.src(config.paths.html)
    .pipe(gulp.dest(config.paths.dist))
})

gulp.task('js', function(){
  browserify(config.paths.indexJs)
    .transform(babelify, {presets: ["es2015", "react", "stage-0"]})
    .bundle()
    .on('error', console.error.bind(console))
    .pipe(source('bundle.js'))
    .pipe(gulp.dest(config.paths.dist + '/scripts'))
})

gulp.task('css', function(){
  gulp.src(config.paths.css)
    .pipe(concat('bundle.css'))
    .pipe(gulp.dest(config.paths.dist + '/css'))
})

gulp.task('default', ['html', 'js', 'css']);
gulp.task('dev', ['html', 'js', 'open', 'watch', 'css']);