/**
 * Yarn [https://yarnpkg.com/] and gulp [https://gulpjs.com/] are used to manage dev dependencies.
 *
 * Once yarn and gulp are installed on your system
 * (instructions on their respective websites),
 * run 'yarn' in theme dir to install
 * all development dependencies
 *
 * Available gulp tasks:
 * gulp version -> changes the theme version in various files throught the project (prompt asks for new version)
 * gulp -> default task, minifies and concatenates css and js files
 * gulp prod -> changes the theme version, minifies and concatenates all CSS and JS files, creates the translations pot file, copies all files to dist folder (cleaning it up beforehand) and creates a new theme zip
 * and finally creates a new theme zip
 * gulp cssmin -> Autoprefixes and minifies all CSS files and adds font-family properties to all rules that contain object-fit, required by object-fit-images plugin
 * gulp cssconcat -> Concatenates all css files into all.css
 * gulp cssconcatmin -> Concatenates all minified css files into all.min.css
 * gulp css -> minifies and concatenates all css files
 * gulp jsconcat -> Concatenates all js files into all.js
 * gulp jsconcatmin -> Concatenates all minified js files into all.min.js
 * gulp jsmin -> minifies all js files
 * gulp clean -> deletes the dist folder
 * gulp cleanmin -> deletes all minified files (css and js) in the project
 * gulp copy -> copies all files to the dist folder (minifies resources and cleans the dist folder beforhand)
 * gulp zip -> creates the zip file for the theme from dist folder (runs gulp copy as a dependend task)
 * gulp pot -> generates the default.pot file for translations
 */

var gulp = require('gulp');
var pjson = require('./package.json');
var replace = require('gulp-replace');
var prompt = require('gulp-prompt');
var rename = require("gulp-rename");
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var objectfit = require('postcss-object-fit-images');
var uglify = require('gulp-uglify');
var del = require('del');
var concat = require('gulp-concat');
var zip = require('gulp-zip');
var runSequence = require('run-sequence');
var pot = require('gulp-wp-pot');

/**
 * Changes the version of the theme based
 * on user input in various files
 */
gulp.task('version', function() {
    return gulp.src(['package.json'])
        .pipe(prompt.prompt({
            type: 'input',
            name: 'version',
            message: 'Enter the new version (current version is ' + pjson.version + '):',
        }, function(res){

            // If user doesn't input the version, don't change it)
            if (!res.version) {
                console.warn('Version has not been changed.');
                return;
            }

            gulp.src(['package.json', 'style.css', 'readme.txt', 'functions.php'])

                // package.json
                .pipe(replace(/\"version\": \".+\",/g, '"version": "' + res.version + '",'))

                // style.css
                .pipe(replace(/Version:\s.+/g, 'Version: ' + res.version))

                // readme.txt
                .pipe(replace(/Current\sversion:\s.+/g, 'Current version: ' + res.version))

                // functions.php
                .pipe(replace(/define\(\'OP3_SMART_THEME_VERSION\'\,\s\'.+\'\)\;/g, "define('OP3_SMART_THEME_VERSION', '" + res.version + "');"))

                .pipe(gulp.dest('./'));

            console.log('Version set to "' + res.version + '".');
        }));
});


/**
 * We're using PostCSS.
 *
 * This autoprefixes and minifies all unminified
 * CSS files, and adds font-family properties
 * to all rules that contain object-fit,
 * required by object-fit-images
 * plugin, a polyfil for
 * object-fit for IE
 */
gulp.task('cssmin', function () {
    var plugins = [
        autoprefixer({
            browsers: [
                'last 2 versions',
                '> 1%',
                'ie >= 9',
                'Edge >= 14'
            ],
            cascade: false,
        }),
        objectfit(),
        cssnano({ zindex: false })
    ];

    return gulp.src([
            '**/*/*.css',
            '!**/*/*.min.css',
            '!dist/**/*',
            '!vendor/**/*',
            '!node_modules/**/*'
        ])
        .pipe(postcss(plugins))
        .pipe(rename(function (path) {
            path.extname = ".min.css"
        }))
        .pipe(gulp.dest('./'));
        // .pipe(gulp.dest('./dist'));
});

/**
 * Concatenates all css files into all.css and
 * (first it minifes all css files)
 *
 * TODO: DRY this up!
 */
gulp.task('cssconcat', ['cssmin'], function() {
    return gulp.src([
            './css/reset.css',
            './css/bootstrap.css',
            './js/swipebox/css/swipebox.css',
            './css/style.css'
        ])
        .pipe(concat('all.css'))

        // Replace paths to external resources in css
        // icons.png
        .pipe(replace(/\.\.\/img\/icons\.png/g, '../js/swipebox/img/icons.png'))
        // loader.gif
        .pipe(replace(/\.\.\/img\/loader\.gif/g, '../js/swipebox/img/loader.gif'))

        .pipe(gulp.dest('./css'));
});

/**
 *
 * Concatenates all minified css files into all.min.css
 * (first it minifes all css files)
 */
gulp.task('cssconcatmin', ['cssmin'], function() {
    return gulp.src([
            './css/reset.min.css',
            './css/bootstrap.min.css',
            './js/swipebox/css/swipebox.min.css',
            './css/style.min.css'
        ])
        .pipe(concat('all.min.css'))

        // Replace paths to external resources in css
        // icons.png
        .pipe(replace(/\.\.\/img\/icons\.png/g, '../js/swipebox/img/icons.png'))
        // loader.gif
        .pipe(replace(/\.\.\/img\/loader\.gif/g, '../js/swipebox/img/loader.gif'))

        .pipe(gulp.dest('./css'));
});

/**
 * Runs cssmin, cssconcat and cssconcatmin
 * (correct order is taken into account)
 */
gulp.task('css', ['cssconcat', 'cssconcatmin']);

/**
 * Concatenates all js files into all.js and
 *
 * TODO: DRY this up!
 */
gulp.task('jsconcat', ['jsmin'], function() {
    return gulp.src([
            './js/bootstrap.js',
            './js/ie10-viewport-bug-workaround.js',
            './js/jquery.fitvids.js',
            './js/swipebox/js/jquery.swipebox.js',
            './js/ofi.js',
            './js/script.js',
            './js/skip-link-focus-fix.js',
        ])
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./js'));
});

/**
 * Concatenates all minified css files into all.min.js
 * (first it minifes all js files)
 *
 * TODO: DRY this up!
 */
gulp.task('jsconcatmin', ['jsmin'], function() {
    return gulp.src([
            './js/bootstrap.min.js',
            './js/ie10-viewport-bug-workaround.min.js',
            './js/jquery.fitvids.min.js',
            './js/swipebox/js/jquery.swipebox.min.js',
            './js/ofi.min.js',
            './js/script.min.js',
            './js/skip-link-focus-fix.min.js',
        ])
        .pipe(concat('all.min.js'))
        .pipe(gulp.dest('./js'));
});

/**
 * Runs tasks jsmin, jsconcat and jsconcatmin
 * (correct order is taken into account)
 */
gulp.task('js', ['jsconcat', 'jsconcatmin']);

/**
 * Minifies all unminified javascript files,
 * and copies them to dist folder
 */
gulp.task('jsmin', function () {
    return gulp.src([
            '**/*/*.js',
            '!**/*/*.min.js',
            '!dist/**/*',
            '!vendor/**/*',
            '!node_modules/**/*'
        ])
        .pipe(uglify())
        .pipe(rename(function (path) {
            path.extname = ".min.js"
        }))
        .pipe(gulp.dest('./'));
});

/**
 * Deletes the dist folder
 */
gulp.task('clean', function () {
    return del(['dist/']);
});

/**
 * Deletes all minified files in the project
 */
gulp.task('cleanmin', function () {
    return del([
        '**/*.min.js',
        '**/*.min.css',
        '!vendor/**/*',
        '!node_modules/**/*'
    ]);
});

/**
 * Copies all files to the dist folder
 */
gulp.task('copy', ['clean', 'css', 'js'], function () {
    return gulp.src([
            '**/*',
            '!.gitignore',
            '!package.json',
            '!gulpfile.js',
            '!yarn.lock',
            '!dist/**/*',
            '!node_modules/**/*'
        ])
        .pipe(gulp.dest('./dist/op3SmartTheme'));
});

/**
 * Creates the zip file for the theme from dist folder
 * (has task that copies all required theme files
 * to dist folder)
 */
gulp.task('zip', ['copy'], function () {
    return gulp.src('dist/**/*')
        .pipe(zip('op3SmartTheme.zip'))
        .pipe(gulp.dest('dist'))
});

/**
 * Generates the default .pot
 * file for translations
 */
gulp.task('pot', function () {
    return gulp.src('**/*.php')
        .pipe(pot({
            domain: 'optimizepress_smart',
            package: 'OptimizePress SmartTheme'
        }))
        .pipe(gulp.dest('languages/default.pot'));
});

/**
 * Changes the version, minifies and concatenates
 * all CSS and JS files, copies all files to
 * dist folder (cleaning it up beforehand),
 * and finally creates a new theme zip
 */
gulp.task('prod', function(callback) {
    return runSequence('version', 'pot', 'zip', callback);
});

/**
 * Minifies and concatenates JS and CSS
 */
gulp.task('default', ['css', 'js']);
