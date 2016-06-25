const gulp = require('gulp')
const babel = require('gulp-babel')
const nodemon = require('gulp-nodemon')
const browserSync = require('browser-sync').create()
const sass = require('gulp-sass')

gulp.task('default', ['build', 'build-front-end', 'watch'])

/////////////////////
// Back End Tasks  //
/////////////////////

// Build Back-End
gulp.task('build', () =>
    gulp.src('src/**/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('dist'))
)

// Watch Back-End
gulp.task('watch', ['build', 'build-front-end'], () =>
    nodemon({
        script: 'dist/app.js',
        gulpCmd: 'node_modules/.bin/gulp',
        watch: 'src',
        tasks: ['build']
    })
)

///////////////////////
//  Front End Tasks  //
///////////////////////

// Build Front-End
gulp.task('build-front-end', [
    'bfe-css',
    'bfe-img',
    'bfe-js',
    'bfe-html'
], () => { })
gulp.task('bfe-css', ['sass'], () =>
    gulp.src('frontend/**/*.css')
        .pipe(gulp.dest('dist/public'))
)
gulp.task('bfe-img', () =>
    gulp.src('frontend/assets/img/**/*')
        .pipe(gulp.dest('dist/public/assets/img'))
)
gulp.task('bfe-js', () =>
    gulp.src('frontend/**/*.js')
        .pipe(gulp.dest('dist/public'))
)
gulp.task('bfe-html', () =>
    gulp.src('frontend/**/*.html')
        .pipe(gulp.dest('dist/public'))
)
// Start BrowserSync
gulp.task('browserSync', function () {
    browserSync.init({
        server: {
            baseDir: 'frontend'
        }
    })
})
// Compile SASS
gulp.task('sass', () => {
    gulp.src('frontend/assets/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('frontend/assets/css/'))
        .pipe(browserSync.stream())
})
// Watch Front-End **NOTE: served from frontend/ not dist/
gulp.task('watch-front-end', ['browserSync', 'sass'], () => {
    gulp.watch('frontend/assets/scss/**/*.scss', ['sass'])
    gulp.watch('frontend/**/*.html', browserSync.reload)
    gulp.watch('frontend/**/*.js', browserSync.reload)
})