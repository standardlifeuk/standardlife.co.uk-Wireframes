'use strict';
// generated on 2014-05-27 using generator-storm-frontend 0.1.0

// = load plugins
//-----------------------------------------------------------------------------//

    var gulp = require('gulp'),
        assemble = require('gulp-assemble'),
        sass = require('gulp-ruby-sass'),
        autoprefixer = require('gulp-autoprefixer'),
        minifycss = require('gulp-minify-css'),
        jshint = require('gulp-jshint'),
        uglify = require('gulp-uglify'),
        imagemin = require('gulp-imagemin'),
        rename = require('gulp-rename'),
        clean = require('gulp-clean'),
        concat = require('gulp-concat'),
        notify = require('gulp-notify'),
        cache = require('gulp-cache'),
        livereload = require('gulp-livereload'),
        connect = require('connect');


// = sass
//-----------------------------------------------------------------------------//

    gulp.task('styles', function() {
        return gulp.src('app/_/sass/app.scss')
        .pipe(sass({ style: 'expanded', }))
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(gulp.dest('app/_/css'))
        .pipe(gulp.dest('dist/_/css'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(minifycss())
        .pipe(gulp.dest('dist/_/css'))
        .pipe(notify({ message: 'Styles task complete' }));
    });

// = assemble
//-----------------------------------------------------------------------------//

    var assembleOptions = {
        data: 'app/data/*.json',
        partials: 'app/templates/partials/*.hbs',
        layoutdir: 'app/templates/layouts/',
        layout: 'default.hbs'
    };

    gulp.task('assemble', function () {
        gulp.src('app/templates/pages/*.hbs')
        .pipe(assemble(assembleOptions))
        .pipe(gulp.dest('app'))
        .pipe(gulp.dest('dist'));
    });


// = scripts
//-----------------------------------------------------------------------------//

    gulp.task('scripts', function() {
        return gulp.src('app/_/js/*.js')
        //.pipe(jshint('.jshintrc'))
        //.pipe(jshint.reporter('default'))
        .pipe(concat('app.js'))
        .pipe(gulp.dest('dist/_/js'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest('dist/_/js'))
        .pipe(notify({ message: 'Scripts task complete' }));
    });


// = images
//-----------------------------------------------------------------------------//

    gulp.task('images', function() {
        return gulp.src('app/_/images/**/*')
        .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
        .pipe(gulp.dest('dist/_/images'))
        .pipe(notify({ message: 'Images task complete' }));
    });


// = clean
//-----------------------------------------------------------------------------//

    gulp.task('clean', function() {
        return gulp.src(['dist/_/css', 'dist/_/js', 'dist/_/images'], {read: false})
        .pipe(clean());
    });


// = connect and serve
//-----------------------------------------------------------------------------//

    gulp.task('connect', function () {
        var connect = require('connect');
        var app = connect()
        .use(require('connect-livereload')({ port: 35729 }))
        .use(connect.static('app'))
        .use(connect.static('.tmp'))
        .use(connect.directory('app'));
        require('http').createServer(app)
        .listen(9000)
        .on('listening', function () {
            console.log('Started connect web server on http://localhost:9000');
        });
    });

    gulp.task('serve', ['connect', 'assemble', 'styles'], function () {
        require('opn')('http://localhost:9000');
    });


// = tasks
//-----------------------------------------------------------------------------//

    // default task
    gulp.task('default', ['clean'], function() {
        gulp.start('styles', 'scripts', 'images', 'assemble');
    });

    // watch task
    gulp.task('watch', ['connect', 'serve'], function() {

        // Watch assembla files
        gulp.watch('app/templates/**/*.hbs', ['assemble']);

        // Watch .scss files
        gulp.watch('app/_/sass/**/*.scss', ['styles']);

        // Watch .js files
        gulp.watch('app/_/js/**/*.js', ['scripts']);

        // Watch image files
        gulp.watch('app/_/images/**/*', ['images']);

        // Create LiveReload server
        var server = livereload();

        // Watch any files in dist/, reload on change
        gulp.watch(['dist/**']).on('change', function(file) {
            server.changed(file.path);
        });
    });