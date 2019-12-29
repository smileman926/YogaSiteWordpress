
'use strict';

// import modules
const Gulp = require('gulp');
const GulpAutoprefixer = require('gulp-autoprefixer');
const GulpConcat = require('gulp-concat');
const GulpEmptyPipe = require('gulp-empty-pipe');
const GulpAddSrc = require('gulp-add-src');
const GulpForEach = require('gulp-foreach');
const GulpMinifier = require('gulp-minifier');
const GulpRemoveLogging = require("gulp-remove-logging");
const GulpPlumber = require('gulp-plumber');
const GulpSass = require('gulp-sass');
const GulpSassGlob = require('gulp-sass-glob');
const GulpSourcemaps = require('gulp-sourcemaps');
const GulpZip = require('gulp-zip');
const Fs = require('fs');
const Tmp = require('tmp');
const Del = require('del');
const Crc = require('crc');
const MergeStream = require('merge-stream');
const Stream = require('stream');

// gulp options
const options = {
    gulpMinifier: {
        minify: true,
        minifyJS: true,
        minifyCSS: true
    },
    gulpPlumber: {
        errorHandler: function(err) {
            console.log(err.toString());
            this.emit('end');
        }
    },
    gulpAutoprefixer: {
        overrideBrowserslist: [ 'last 2 versions', 'not ie > 0', 'not ie_mob > 0', 'not dead' ],
        grid: true,
        cascade: false
    },
    gulpAutoprefixerFrontend: {
        overrideBrowserslist: [ 'last 2 versions' ],
        grid: true,
        cascade: false
    },
    gulpRemoveLogging: {
    }
}

// define paths
const path = {
    lang: 'lang/',
    src: {
        vendor: 'node_modules/',
        resources: 'resources/',
        assets: 'resources/assets/',
        lib: 'resources/assets/lib/',
        images: 'resources/assets/img/',
        styles: 'resources/assets/sass/',
        scripts: 'resources/assets/js/',
        elements: 'resources/elements/',
        properties: 'resources/properties/',
        blocks: 'resources/blocks/',
    },
    build: {
        assets: 'public/assets/',
        images: 'public/assets/img/',
        styles: 'public/assets/css/',
        scripts: 'public/assets/js/',
        fonts: 'public/assets/fonts/',
        cache: 'public/assets/cache/',
    },
    dist: 'dist/'
}

// environment
const build_env = function(env) {
    let time = new Date().getTime() / 1000;
    let result = {
        env: env,
        time: time,
        hash: Crc.crc32('' + time).toString(16),
    }

    Fs.writeFileSync('.build', JSON.stringify(result));

    // return empty stream
    return Gulp.src([]);
}

// copy screenshot stylesheets to public directory
const build_screenshot_stylesheets = function(env) {
    console.log('- op3 screenshot stylesheets');

    return Gulp
        .src([
            path.src.styles   + 'op3-screenshot.scss',
            path.src.elements + '*/sass/op3-screenshot.scss',
        ])
        .pipe(GulpConcat('op3-screenshot.css'))
        .pipe(env === 'dev' ? GulpSourcemaps.init() : GulpEmptyPipe())
        .pipe(GulpSass())
        .pipe(env === 'prod' ? GulpAutoprefixer(options.gulpAutoprefixerDesigner || options.gulpAutoprefixer) : GulpEmptyPipe())
        .pipe(env === 'prod' ? GulpMinifier(options.gulpMinifier) : GulpEmptyPipe())
        .pipe(env === 'dev' ? GulpSourcemaps.write() : GulpEmptyPipe())
        .pipe(GulpPlumber.stop())
        .pipe(Gulp.dest(path.build.styles));
}

// copy font stylesheets to public directory
const build_font_stylesheets = function(env) {
    console.log('- op3 font stylesheets');

    return Gulp
        .src([
            path.src.styles + 'core/_op3-icons-base.scss',
            path.src.styles + 'core/_op3-icons.scss',
        ])
        .pipe(GulpConcat('op3-icons.css'))
        .pipe(env === 'dev' ? GulpSourcemaps.init() : GulpEmptyPipe())
        .pipe(GulpSass())
        .pipe(env === 'prod' ? GulpAutoprefixer(options.gulpAutoprefixerDesigner || options.gulpAutoprefixer) : GulpEmptyPipe())
        .pipe(env === 'prod' ? GulpMinifier(options.gulpMinifier) : GulpEmptyPipe())
        .pipe(env === 'dev' ? GulpSourcemaps.write() : GulpEmptyPipe())
        .pipe(GulpPlumber.stop())
        .pipe(Gulp.dest(path.build.styles));
}

// copy fonts to public directory
const build_font_files = function(env) {
    console.log('- op3 font files');

    return Gulp
        .src([
            path.src.assets + 'fonts/*'
        ])
        .pipe(Gulp.dest(path.build.fonts));
}

// wordpress plugin
const build_admin_scripts = function(env) {
    console.log('- op3 admin scripts');

    return Gulp
        .src([
            // pass
        ])
        .pipe(GulpPlumber(options.gulpPlumber))
        .pipe(env === 'dev' ? GulpSourcemaps.init() : GulpEmptyPipe())
        .pipe(GulpConcat('op3-admin.js'))
        .pipe(env === 'prod' ? GulpMinifier(options.gulpMinifier) : GulpEmptyPipe())
        .pipe(env === 'dev' ? GulpSourcemaps.write() : GulpEmptyPipe())
        .pipe(GulpPlumber.stop())
        .pipe(Gulp.dest(path.build.scripts));
}

// wordpress plugin
const build_admin_styles = function(env) {
    console.log('- op3 admin styles');

    return Gulp
        .src([
            path.src.styles + 'wp/op3-admin.scss'
        ])
        .pipe(GulpPlumber(options.gulpPlumber))
        .pipe(env === 'dev' ? GulpSourcemaps.init() : GulpEmptyPipe())
        .pipe(GulpSass())
        .pipe(env === 'prod' ? GulpAutoprefixer(options.gulpAutoprefixerAdmin || options.gulpAutoprefixer) : GulpEmptyPipe())
        .pipe(GulpConcat('op3-admin.css'))
        .pipe(env === 'dev' ? GulpSourcemaps.write() : GulpEmptyPipe())
        .pipe(env === 'prod' ? GulpMinifier(options.gulpMinifier) : GulpEmptyPipe())
        .pipe(GulpPlumber.stop())
        .pipe(Gulp.dest(path.build.styles));
}

// wordpress plugin
const build_admin_images = function(env) {
    console.log('- op3 admin images');

    return Gulp
        .src([
            path.src.images + '**',
            // font sprite is now used, so there's no need to copy all of those.
            '!' + path.src.images + 'fonts',
            '!' + path.src.images + 'fonts/**',

        ])
        .pipe(Gulp.dest(path.build.images));
}

// op3 layer wrapper
const build_wrapper_scripts = function(env) {
    console.log('- op3 wrapper scripts');

    return Gulp
        .src([
            path.src.lib     + 'jquery-mmdnd/jquery-mmdnd.js',
            path.src.scripts + 'op3-core.js',
            path.src.scripts + 'op3-meta.js',
            path.src.scripts + 'op3-ajax.js',
            path.src.scripts + 'wrapper/iframe.js',
            path.src.scripts + 'wrapper/gutenberg.js',
            path.src.scripts + 'wrapper/editor.js',
            path.src.scripts + 'op3-create-new-page.js',
            path.src.scripts + 'op3-unsplash.js',
            path.src.scripts + 'op3-wp-media-library.js',
        ])
        .pipe(GulpPlumber(options.gulpPlumber))
        .pipe(env === 'dev' ? GulpSourcemaps.init() : GulpEmptyPipe())
        .pipe(GulpConcat('op3-wrapper.js'))
        .pipe(env === 'prod' ? GulpRemoveLogging(options.gulpRemoveLogging) : GulpEmptyPipe())
        .pipe(env === 'prod' ? GulpMinifier(options.gulpMinifier) : GulpEmptyPipe())
        .pipe(env === 'dev' ? GulpSourcemaps.write() : GulpEmptyPipe())
        .pipe(GulpPlumber.stop())
        .pipe(Gulp.dest(path.build.scripts));
}

// op3 layer wrapper
const build_wrapper_styles = function(env) {
    console.log('- op3 wrapper styles');

    return Gulp
        .src([
            path.src.lib    + 'jquery-mmdnd/jquery-mmdnd.css',
            path.src.styles + 'op3-wrapper.scss',
            path.src.styles + 'op3-unsplash.scss',
        ])
        .pipe(GulpPlumber(options.gulpPlumber))
        .pipe(env === 'dev' ? GulpSourcemaps.init() : GulpEmptyPipe())
        .pipe(GulpSass())
        .pipe(env === 'prod' ? GulpAutoprefixer(options.gulpAutoprefixerWrapper || options.gulpAutoprefixer) : GulpEmptyPipe())
        .pipe(GulpConcat('op3-wrapper.css'))
        .pipe(env === 'dev' ? GulpSourcemaps.write() : GulpEmptyPipe())
        .pipe(env === 'prod' ? GulpMinifier(options.gulpMinifier) : GulpEmptyPipe())
        .pipe(GulpPlumber.stop())
        .pipe(Gulp.dest(path.build.styles));
}

// op3 layer wrapper
const build_wrapper_images = function(env) {
    console.log('- op3 wrapper images');

    return Gulp
        .src([]);
}

// op3 layer live-editor
const build_live_editor_scripts = function(env) {
    console.log('- op3 live-editor scripts');

    return Gulp
        .src([
            path.src.vendor  + 'jquery/dist/jquery.js',
            path.src.vendor  + 'async-worker-js/src/async-worker.js',
            path.src.vendor  + 'alertifyjs/build/alertify.js',
            path.src.vendor  + 'jsoner/src/jsoner.js',
            path.src.vendor  + 'scrollbar-size/src/scrollbar-size.js',
            path.src.vendor  + 'sortablejs/Sortable.js',
            path.src.vendor  + 'select2/dist/js/select2.full.js',
            path.src.vendor  + 'color/src/color.js',
            path.src.lib     + 'colorpicker/colorpicker.js',
            path.src.lib     + 'jquery-draggable/jquery-draggable.js',
            path.src.lib     + 'jquery-mmdnd/jquery-mmdnd.js',
            path.src.lib     + 'jquery-filter-button/jquery-filter-button.js',
            path.src.lib     + 'jquery-filter-dropdown/jquery-filter-dropdown.js',
            path.src.lib     + 'jquery-anglepicker/jquery-anglepicker.js',
            path.src.lib     + 'jquery-grid-picker/jquery-grid-picker.js',
            path.src.lib     + 'jquery-select-buttons/jquery-select-buttons.js',
            path.src.lib     + 'jquery-select-toggle-button/jquery-select-toggle-button.js',
            path.src.lib     + 'jquery-input-range/jquery-input-range.js',
            path.src.lib     + 'jquery-paddingdrag/jquery-paddingdrag.js',
            path.src.lib     + 'jquery-base64-image-preview/jquery-base64-image-preview.js',
            path.src.lib     + 'jquery-get-event-listeners/jquery-get-event-listeners.js',
            path.src.vendor  + 'flatpickr/dist/flatpickr.js',
            path.src.vendor  + 'devbridge-autocomplete/dist/jquery.autocomplete.js',
            path.src.scripts + 'op3-core.js',
            path.src.scripts + 'op3-meta.js',
            path.src.scripts + 'op3-media.js',
            path.src.scripts + 'op3-modal.js',
            path.src.scripts + 'op3-wizard.js',
            path.src.scripts + 'op3-ui.js',
            path.src.scripts + 'op3-ui-alertify.js',
            path.src.scripts + 'op3-storage.js',
            path.src.scripts + 'op3-cookie.js',
            path.src.scripts + 'op3-worker.js',
            path.src.scripts + 'op3-ajax.js',
            path.src.scripts + 'op3-screenshot.js',
            path.src.scripts + 'op3-export.js',
            path.src.scripts + 'op3-membership.js',
            path.src.scripts + 'op3-live-editor.js',
            path.src.scripts + 'op3-live-editor-header.js',
            path.src.scripts + 'op3-live-editor-devices.js',
            path.src.scripts + 'op3-live-editor-sidebar.js',
            path.src.scripts + 'op3-live-editor-sidebar-categories.js',
            path.src.scripts + 'op3-live-editor-sidebar-groups.js',
            path.src.scripts + 'op3-live-editor-sidebar-global-elements.js',
            path.src.scripts + 'op3-live-editor-sidebar-blocks.js',
            path.src.scripts + 'op3-live-editor-sidebar-export.js',
            path.src.scripts + 'op3-live-editor-sidebar-popoverlay.js',
            path.src.scripts + 'op3-live-editor-sidebar-page-settings.js',
            path.src.scripts + 'op3-live-editor-sidebar-options.js',
            path.src.scripts + 'op3-live-editor-sidebar-focus.js',
            path.src.scripts + 'op3-live-editor-sidebar-revisions.js',
            path.src.scripts + 'op3-live-editor-property-type-*.js',
            path.src.scripts + 'op3-live-editor-breadcrumbs.js',
            path.src.scripts + 'op3-live-editor-element-state.js',
            path.src.scripts + 'op3-live-editor-modal-serialize.js',
            path.src.scripts + 'op3-live-editor-modal-unserialize.js',
            //path.src.scripts + 'op3-live-editor-modal-style-picker.js',
            path.src.scripts + 'op3-document-options.js',
            path.src.scripts + 'op3-document-options-config.js',
            path.src.scripts + 'op3-element-options.js',
            path.src.scripts + 'op3-element-options-config.js',
            path.src.scripts + 'op3-live-editor-toolbar.js',
            path.src.scripts + 'op3-live-editor-toolbar-config.js',
            path.src.scripts + 'op3-live-editor-context-menu.js',
            path.src.scripts + 'op3-live-editor-mousedown.js',
            path.src.scripts + 'op3-live-editor-paddingdrag.js',
        ])
        .pipe(GulpPlumber(options.gulpPlumber))
        .pipe(env === 'dev' ? GulpSourcemaps.init() : GulpEmptyPipe())
        .pipe(GulpConcat('op3-live-editor.js'))
        .pipe(env === 'prod' ? GulpRemoveLogging(options.gulpRemoveLogging) : GulpEmptyPipe())
        .pipe(env === 'prod' ? GulpMinifier(options.gulpMinifier) : GulpEmptyPipe())
        .pipe(env === 'dev' ? GulpSourcemaps.write() : GulpEmptyPipe())
        .pipe(GulpPlumber.stop())
        .pipe(Gulp.dest(path.build.scripts));
}

// op3 layer live-editor
const build_live_editor_styles = function(env) {
    console.log('- op3 live-editor styles');

    return Gulp
        .src([
            path.src.vendor   + 'alertifyjs/build/css/alertify.css',
            path.src.vendor   + 'alertifyjs/build/css/themes/default.css',
            path.src.vendor   + 'jsoner/src/jsoner.css',
            path.src.vendor   + 'select2/dist/css/select2.css',
            path.src.vendor   + 'flatpickr/dist/flatpickr.css',
            path.src.lib      + 'colorpicker/colorpicker.css',
            path.src.lib      + 'jquery-draggable/jquery-draggable.css',
            path.src.lib      + 'jquery-mmdnd/jquery-mmdnd.css',
            path.src.lib      + 'jquery-filter-button/jquery-filter-button.css',
            path.src.lib      + 'jquery-filter-dropdown/jquery-filter-dropdown.css',
            path.src.lib      + 'jquery-grid-picker/jquery-grid-picker.css',
            path.src.lib      + 'jquery-select-buttons/jquery-select-buttons.css',
            path.src.lib      + 'jquery-input-range/jquery-input-range.css',
            path.src.lib      + 'jquery-anglepicker/jquery-anglepicker.css',
            path.src.lib      + 'jquery-paddingdrag/jquery-paddingdrag.css',
            path.src.lib      + 'jquery-base64-image-preview/jquery-base64-image-preview.css',
            path.src.styles   + 'op3-live-editor.scss',
        ])
        .pipe(GulpPlumber(options.gulpPlumber))
        .pipe(GulpSassGlob({
            // default element and proeprty are ignored here,
            // and included separately in op3-designer.scss
            // to ensure they are loaded first
            ignorePaths: [
                'live-editor/sidebar/*sidebar-base.scss',
                'live-editor/sidebar/*op3-options.scss',
            ]
        }))
        .pipe(env === 'dev' ? GulpSourcemaps.init() : GulpEmptyPipe())
        .pipe(GulpSass())
        .pipe(env === 'prod' ? GulpAutoprefixer(options.gulpAutoprefixerLiveEditor || options.gulpAutoprefixer) : GulpEmptyPipe())
        .pipe(GulpConcat('op3-live-editor.css'))
        .pipe(env === 'dev' ? GulpSourcemaps.write() : GulpEmptyPipe())
        .pipe(env === 'prod' ? GulpMinifier(options.gulpMinifier) : GulpEmptyPipe())
        .pipe(GulpPlumber.stop())
        .pipe(Gulp.dest(path.build.styles));
}

// op3 layer live-editor
const build_live_editor_images = function(env) {
    console.log('- op3 live-editor images');

    return Gulp
        .src([
            path.src.elements + '*/img/**/*.svg',
            path.src.properties + '*/img/**/*.svg',
            path.src.blocks + '*/img/**/*.svg',

            path.src.elements + '*/img/**/*.png',
            path.src.properties + '*/img/**/*.png',
            path.src.blocks + '*/img/**/*.png',

            path.src.elements + '*/img/**/*.jpg',
            path.src.properties + '*/img/**/*.jpg',
            path.src.blocks + '*/img/**/*.jpg',
        ])
        .pipe(GulpForEach(function(stream, file) {
            let match = file.path.match(RegExp('(' + path.src.elements + '|' + path.src.properties + '|' + path.src.blocks + ')' + '(.+)/img/(.+\.(svg|png|jpg))$'));
            let kind = match[1].replace(/\/+$/g, '').split('/').pop();
            let type = match[2];
            let uri = match[3];

            return stream
                .pipe(GulpConcat(uri))
                .pipe(Gulp.dest(path.build.images + kind + '/' + type));
        }));
}

// op3 layer designer
const build_designer_scripts = function(env) {
    console.log('- op3 designer scripts');

    return Gulp
        .src([
            path.src.vendor     + 'jquery/dist/jquery.js',
            path.src.vendor     + 'jquery.flex-grid-cell-sizer/src/jquery.flex-grid-cell-sizer.js',
            path.src.vendor     + 'devbridge-autocomplete/dist/jquery.autocomplete.js',
            path.src.vendor     + 'jquery-countdown/dist/jquery.countdown.js',
            path.src.vendor     + 'fast-diff/diff.js',
            path.src.vendor     + 'ice-text-editor/src/ice-core.js',
            path.src.vendor     + 'ice-text-editor/src/ice-editor.js',
            path.src.vendor     + 'ice-text-editor/src/ice-shortcuts.js',
            path.src.vendor     + 'ice-text-editor/src/ice-floatbar.js',
            path.src.vendor     + 'lorem-ipsum-js/src/lorem-ipsum.js',
            path.src.vendor     + 'person-ipsum-js/src/person-ipsum.js',
            path.src.vendor     + 'color/src/color.js',
            path.src.lib        + 'colorpicker/colorpicker.js',
            path.src.lib        + 'jquery-simple-nav-tree/jquery-simple-nav-tree.js',
            path.src.lib        + 'jquery-mmdnd/jquery-mmdnd.js',
            path.src.lib        + 'jquery-accordion/jquery-accordion.js',
            path.src.lib        + 'rating-svg/src/rating-svg.js',
            path.src.lib        + 'op3-ipsum/op3-ipsum.js',
            path.src.lib        + 'resize-observer-polyfill/resize-observer-polyfill.js',
            path.src.lib        + 'facebook-sdk/facebook-sdk.js',
            path.src.scripts    + 'op3-core.js',
            path.src.scripts    + 'op3-meta.js',
            path.src.scripts    + 'op3-ajax.js',
            path.src.scripts    + 'op3-lang.js',
            path.src.scripts    + 'op3-log-site.js',
            path.src.scripts    + 'op3-loadinfo.js',
            path.src.scripts    + 'op3-text-editor.js',
            path.src.scripts    + 'op3-menu-simple-nav-tree.js',
            path.src.scripts    + 'op3-random-media.js',
            path.src.scripts    + 'op3-countdown.js',
            path.src.scripts    + 'op3-elements.js',
            path.src.scripts    + 'op3-element-storage.js',
            path.src.scripts    + 'op3-blocks.js',
            path.src.scripts    + 'op3-query.js',
            path.src.scripts    + 'op3-map.js',
            path.src.scripts    + 'op3-global-elements.js',
            path.src.scripts    + 'op3-link-properties.js',
            path.src.scripts    + 'op3-link-properties-config.js',
            path.src.scripts    + 'op3-revisions.js',
            path.src.scripts    + 'op3-menus.js',
            path.src.scripts    + 'op3-membership-pages.js',
            path.src.scripts    + 'op3-fonts.js',
            path.src.scripts    + 'op3-icons.js',
            path.src.scripts    + 'op3-icons-config.js',
            path.src.scripts    + 'op3-funnels.js',
            path.src.scripts    + 'op3-integrations.js',
            path.src.scripts    + 'op3-designer.js',
            path.src.scripts    + 'op3-designer-draganddrop.js',
            path.src.scripts    + 'op3-designer-add-section.js',
            path.src.scripts    + 'op3-designer-empty-childlist-click.js',
            path.src.scripts    + 'op3-designer-element-focus.js',
            path.src.scripts    + 'op3-designer-element-layouts.js',
            path.src.scripts    + 'op3-event-load-uuids.js',
            path.src.properties + 'default/js/op3-property.js',
            path.src.properties + '*/js/op3-property.js',
            path.src.elements   + 'default/js/op3-element.js',
            path.src.elements   + '*/js/op3-element.js',
            path.src.elements   + 'image/js/op3-element-wp.js',
            path.src.scripts    + 'op3-document.js',
            path.src.scripts    + 'op3-history.js',
            path.src.scripts    + 'op3-shortcuts.js',
        ])
        .pipe(GulpPlumber(options.gulpPlumber))
        .pipe(env === 'dev' ? GulpSourcemaps.init() : GulpEmptyPipe())
        .pipe(GulpConcat('op3-designer.js'))
        .pipe(env === 'prod' ? GulpRemoveLogging(options.gulpRemoveLogging) : GulpEmptyPipe())
        .pipe(env === 'prod' ? GulpMinifier(options.gulpMinifier) : GulpEmptyPipe())
        .pipe(env === 'dev' ? GulpSourcemaps.write() : GulpEmptyPipe())
        .pipe(GulpPlumber.stop())
        .pipe(Gulp.dest(path.build.scripts));
}

// op3 layer designer
const build_designer_styles = function(env) {
    console.log('- op3 designer styles');

    return Gulp
        .src([
            // path.src.vendor   + 'bootstrap/dist/css/bootstrap-reboot.css',
            path.src.vendor   + 'jquery.flex-grid-cell-sizer/src/jquery.flex-grid-cell-sizer.css',
            path.src.vendor   + 'ice-text-editor/src/ice-editor.css',
            path.src.vendor   + 'ice-text-editor/src/ice-floatbar.css',
            path.src.lib      + 'colorpicker/colorpicker.css',
            path.src.lib      + 'jquery-mmdnd/jquery-mmdnd.css',
            path.src.lib      + 'jquery-paddingdrag/jquery-paddingdrag.css',
            path.src.styles   + 'op3-designer.scss',
        ])
        .pipe(GulpPlumber(options.gulpPlumber))
        .pipe(GulpSassGlob({
            // default element and proeprty are ignored here,
            // and included separately in op3-designer.scss
            // to ensure they are loaded first
            ignorePaths: ['**/default/sass/*.scss']
        }))
        .pipe(env === 'dev' ? GulpSourcemaps.init() : GulpEmptyPipe())
        .pipe(GulpSass())
        .pipe(env === 'prod' ? GulpAutoprefixer(options.gulpAutoprefixerDesigner || options.gulpAutoprefixer) : GulpEmptyPipe())
        .pipe(GulpConcat('op3-designer.css'))
        .pipe(env === 'dev' ? GulpSourcemaps.write() : GulpEmptyPipe())
        .pipe(env === 'prod' ? GulpMinifier(options.gulpMinifier) : GulpEmptyPipe())
        .pipe(GulpPlumber.stop())
        .pipe(Gulp.dest(path.build.styles));
}

// op3 layer designer
const build_designer_images = function(env) {
    console.log('- op3 designer images');

    return Gulp
        .src([]);
}

// op3 frontend
const build_frontend_scripts = function(env) {
    console.log('- op3 frontend scripts');

    // build scripts for each script asset
    // used in element's config.php
    return Gulp
        .src([
            path.src.vendor  + 'jquery/dist/jquery.js',
            path.src.scripts  + 'op3-cookie.js',
            path.src.vendor   + 'jquery-countdown/dist/jquery.countdown.js',
            path.src.vendor   + 'dom-to-image/src/dom-to-image.js',
            path.src.elements + 'countdowntimer/js/op3-element-countdowntimer.js',
            path.src.elements + 'evergreencountdowntimer/js/op3-element-evergreencountdowntimer.js',
            path.src.lib      + 'jquery-accordion/jquery-accordion.js',
            path.src.lib      + 'facebook-sdk/facebook-sdk.js',
            path.src.elements + 'contenttoggle/js/op3-element-contenttoggle.js',
            path.src.elements + 'faq/js/op3-element-faq.js',
            path.src.elements + 'form/js/op3-element-form.js',
            path.src.elements + 'popoverlay/js/op3-element-popoverlay.js',
            path.src.elements + 'progressbar/js/op3-element-progressbar.js',
            path.src.lib      + 'jquery-simple-nav-tree/jquery-simple-nav-tree.js',
            path.src.elements + 'treemenu/js/op3-element-treemenu.js',
            path.src.elements + 'video/js/op3-element-video.js',
        ])
        .pipe(GulpForEach(function(stream, file) {
            return stream
                .pipe(GulpPlumber(options.gulpPlumber))
                .pipe(env === 'dev' ? GulpSourcemaps.init() : GulpEmptyPipe())
                .pipe(env === 'prod' ? GulpRemoveLogging(options.gulpRemoveLogging) : GulpEmptyPipe())
                .pipe(env === 'prod' ? GulpMinifier(options.gulpMinifier) : GulpEmptyPipe())
                .pipe(env === 'dev' ? GulpSourcemaps.write() : GulpEmptyPipe())
                .pipe(GulpPlumber.stop())
                .pipe(Gulp.dest(path.build.scripts));
        }));
}

// op3 frontend
const build_frontend_styles = function(env) {
    console.log('- op3 frontend styles');

    // build css stylesheets for
    // each element/property
    return Gulp
        .src([
            path.src.properties + '*/sass/op3-property.scss',
            path.src.elements   + '*/sass/op3-element.scss',
            path.src.elements   + '*/sass/op3-element-ie.scss',
        ])
        .pipe(GulpForEach(function(stream, file) {
            let match = file.path.match(RegExp('(' + path.src.elements + '|' + path.src.properties + ')' + '(.+)/sass/(.+\.scss)$'));
            let kind = match[1].replace(/\/+$/g, '').split('/').pop();
            let type = match[2];
            let uri = match[3].replace(/\.scss$/, '');
            let dest = path.build.styles + kind + '/' + type;

            return stream
                // GulpForEach doersn't support sourcemaps,
                // so I'm commenting this out for now
                // .pipe(env === 'dev' ? GulpSourcemaps.init() : GulpEmptyPipe())
                .pipe(GulpAddSrc.prepend([
                    path.src.styles + 'core/_op3-variables.scss',
                ]))
                .pipe(GulpPlumber(options.gulpPlumber))
                .pipe(GulpConcat(uri))
                .pipe(GulpSass())
                .pipe(env === 'prod' ? GulpAutoprefixer(options.gulpAutoprefixerFrontend || options.gulpAutoprefixer) : GulpEmptyPipe())
                // .pipe(env === 'dev' ? GulpSourcemaps.write() : GulpEmptyPipe())
                .pipe(env === 'prod' ? GulpMinifier(options.gulpMinifier) : GulpEmptyPipe())
                .pipe(GulpPlumber.stop())
                .pipe(Gulp.dest(dest));
        }));
}

// op3 basic frontend styles, used everytime
const build_frontend_core_styles = function (env) {
    console.log('- op3 frontend core styles');

    // build css stylesheets for
    // each element/property
    return Gulp
        .src([
            path.src.styles + 'core/_op3-core.scss',
            path.src.styles + 'wp/_op3-public.scss',
        ])
        .pipe(GulpPlumber(options.gulpPlumber))
        .pipe(env === 'dev' ? GulpSourcemaps.init() : GulpEmptyPipe())
        .pipe(GulpConcat('op3-core.css'))
        .pipe(GulpSass())
        .pipe(env === 'prod' ? GulpAutoprefixer(options.gulpAutoprefixerFrontend || options.gulpAutoprefixer) : GulpEmptyPipe())
        .pipe(env === 'dev' ? GulpSourcemaps.write() : GulpEmptyPipe())
        .pipe(env === 'prod' ? GulpMinifier(options.gulpMinifier) : GulpEmptyPipe())
        .pipe(GulpPlumber.stop())
        .pipe(Gulp.dest(path.build.styles));
}

// op3 layer designer
const build_frontend_template = function(env) {
    console.log('- op3 frontend template');

    // blank template
    return Gulp
        .src([
            path.src.vendor + 'bootstrap/dist/css/bootstrap-reboot.css',
        ])
        .pipe(GulpPlumber(options.gulpPlumber))
        .pipe(env === 'dev' ? GulpSourcemaps.init() : GulpEmptyPipe())
        .pipe(GulpConcat('op3-reboot.css'))
        .pipe(env === 'prod' ? GulpAutoprefixer(options.gulpAutoprefixerFrontend || options.gulpAutoprefixer) : GulpEmptyPipe())
        .pipe(env === 'dev' ? GulpSourcemaps.write() : GulpEmptyPipe())
        .pipe(env === 'prod' ? GulpMinifier(options.gulpMinifier) : GulpEmptyPipe())
        .pipe(GulpPlumber.stop())
        .pipe(Gulp.dest(path.build.styles));
}

// op3 layer designer
const build_frontend_images = function(env) {
    console.log('- op3 frontend images');

    return Gulp
        .src([]);
}

// op3 all
const build_all = function(env) {
    return MergeStream(
        build_env(env),
        build_screenshot_stylesheets(env),
        build_font_stylesheets(env),
        build_font_files(env),
        build_admin_scripts(env),
        build_admin_styles(env),
        build_admin_images(env),
        build_wrapper_scripts(env),
        build_wrapper_styles(env),
        build_wrapper_images(env),
        build_live_editor_scripts(env),
        build_live_editor_styles(env),
        build_live_editor_images(env),
        build_designer_scripts(env),
        build_designer_styles(env),
        build_designer_images(env),
        build_frontend_scripts(env),
        build_frontend_core_styles(env),
        build_frontend_styles(env),
        build_frontend_template(env),
        build_frontend_images(env)
    );
}

// gulp task development build
Gulp.task('dev', function() {
    console.log('Creating development build:');
    return build_all('dev');
});

// Deletes the contents of the /dist & /public folders
Gulp.task('clean', function () {
    console.log('Cleaning dist & public:');
    return Del([
        'dist/*',
        '!dist/.gitignore',
        'public/*'
    ]);
});

// gulp task production build
Gulp.task('prod', ['clean'], function() {
    console.log('Creating production build:');
    return build_all('prod');
});

// gulp task release build
Gulp.task('build', function() {
    console.log('Creating production release build:');
    return build_all('prod');
});

// gulp task wordpress plugin
Gulp.task('dist', ['prod'], function() {
    console.log('Archiving wordpress plugin...');

    return Gulp
        .src([
            '**/*',
            '!{_docs,_docs/**}',
            '!{bin,bin/**}',
            '!{dist,dist/**}',
            '!{lang/default.json}',
            '!{node_modules,node_modules/**}',
            '!{resources/assets,resources/assets/**}',
            '!{resources/elements/*/sass,resources/elements/*/sass/**}',
            '!{resources/elements/*/img,resources/elements/*/img/**}',
            '!{resources/elements/*/js,resources/elements/*/js/**}',
            '!{resources/properties/*/sass,resources/properties/*/sass/**}',
            '!{resources/properties/*/img,resources/properties/*/img/**}',
            '!{resources/properties/*/js,resources/properties/*/js/**}',
            '!{resources/bin/,resources/bin/*}',
            '!{storage,storage/**}',
            '!{test,test/**}',
            '!{tests,tests/**}',
            '!**/.*',
            '!**/*.{backup,backup/**}',
            '!composer.json',
            '!composer.lock',
            '!gulpfile.js',
            '!INSTALL.md',
            '!package.json',
            '!package-lock.json',
            '!yarn.lock',
            '!@todo',
        ], { base: '../' })
        .pipe(GulpAddSrc.append([
            '.build',
        ], { base: '../' }))
        .pipe(GulpPlumber(options.gulpPlumber))
        .pipe(GulpZip('op-builder.zip'))
        .pipe(GulpPlumber.stop())
        .pipe(Gulp.dest(path.dist));
});

// gulp watch
Gulp.task('watch', ['dev'], function() {
    console.log('Initializing assets watcher:')

    let stream = new Stream();
    let filter = '*.{css,scss,sass,less,js,png,jpg,jpeg,svg}';
    let tmp = Tmp.fileSync();
    let glob = [
        path.src.assets + '**/' + filter,
        path.src.elements + '**/' + filter,
        path.src.properties + '**/' + filter,
    ];

    for (let i = 0; i < glob.length; i++) {
        console.log('- ' + glob[i]);
    }

    let watcher = Gulp.watch(glob, ['dev']);
    watcher.add(tmp.name);

    process.on('SIGINT', function() {
        stream.emit('end');
        process.exit(0);
    });

    const KeyPress = require('keypress');
    KeyPress(process.stdin);
    process.stdin.on('keypress', function(char, key) {
        if (key && key.ctrl && key.name == 'c') {
            process.emit('SIGINT');
        }
        else if (key && key.ctrl && key.name == 'r') {
            Fs.utimes(tmp.name, new Date(), new Date(), function() {});
        }
    });
    process.stdin.setRawMode(true);
    process.stdin.resume();

    console.log('Watcher up and running, Ctrl+R to refresh, Ctrl+C to exit.');
    return stream;
});

// gulp lang task
Gulp.task('lang', function() {
    console.log('Creating default lang file...')

    let stream = new Stream();
    let exec = require('child_process').exec;
    let cmd = ''
        + ''    + 'find ' + path.src.resources + ' -type f -name "*.js"'
        + ' | ' + 'xargs grep -E "OP3\\._\\(.*?\\)"'
        + ' | ' + 'sed -nr \'s/.*OP3\\._\\((.*?)\\).*/\\1/p\''
        + ' | ' + 'sort'
        + ' | ' + 'uniq';

    exec(cmd, function (err, stdout, stderr) {
        let map = {};
        let words = stdout.trim().split('\n')
            .map(function(item) {
                return JSON.parse(item);
            })
            .forEach(function(item) {
                map[item] = item;
            });
        let data = JSON.stringify(map, null, 4);

        Fs.writeFileSync(path.lang + 'default.json', data);
        console.log('File ' + path.lang + 'default.json created.')

        stream.emit('end');
    });

    return stream;
});

// gulp dummy task (for testing)
Gulp.task('dummy', function() {
    console.log('Dummy task executed, closing in...')

    let stream = new Stream();
    let count = 5;
    let interval = setInterval(function() {
        console.log(count--);

        if (count < 0) {
            clearInterval(interval);
            stream.emit('end');
        }
    }, 1000);

    return stream;
});

Gulp.task('lint-css', function lintCssTask() {
    const GulpStylelint = require('gulp-stylelint');

    return Gulp
        .src([
            path.src.styles + '**/*.scss',
            path.src.properties + '**/*.scss',
            path.src.elements + '**/*.scss',
        ])
        .pipe(GulpStylelint({
            reporters: [{
                formatter: 'string',
                console: true
            }]
        }));
});

// gulp help
Gulp.task('help', function() {
    console.log('USAGE: gulp [TASK1 [, TAKS2 [...]]]');
    console.log('Executes op3 gulp task runner...');
    console.log('');
    console.log('Tasks:');
    console.log('    default    execute prod and dist');
    console.log('    dev        prepare and build assets for development');
    console.log('    dist       archive wordpress plugin');
    console.log('    dummy      execute dummy task (testing purpose)');
    console.log('    help       display this help');
    console.log('    prod       prepare and build assets for production');
    console.log('    watch      initialize assets watcher');
    console.log('               (execute dev on init and on any asset change)');
    console.log('    lint-css   lints the scss in the projects and notifies for any errors');
    console.log('');
    console.log('Note: if no task is defined default task will be executed.');
});

// gulp default task (execute prod and dist)
Gulp.task('default', ['dist']);
