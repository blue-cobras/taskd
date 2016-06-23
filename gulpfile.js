const gulp = require('gulp')
const babel = require('gulp-babel')
const nodemon = require('gulp-nodemon')
const browserSync = require('browser-sync').create()
const sass = require('gulp-sass')

gulp.task('default', ['build', 'build-front-end', 'watch'])

gulp.task('build', () =>
    gulp.src('src/**/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('dist'))
)

gulp.task('build-front-end', () =>
    gulp.src('frontend/**/*')
        .pipe(gulp.dest('dist/public'))
)

gulp.task('browserSync', function () {
    browserSync.init({
        server: {
            baseDir: 'frontend'
        }
    })
})

gulp.task('sass', () => {
    gulp.src('frontend/assets/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('frontend/assets/css/'))
        .pipe(browserSync.stream())
})

gulp.task('watch-front-end', ['browserSync', 'sass'], () => {
    gulp.watch('frontend/assets/scss/**/*.scss', ['sass'])
    gulp.watch('frontend/**/*.html', browserSync.reload)
    gulp.watch('frontend/**/*.js', browserSync.reload)
})

gulp.task('watch', ['build', 'build-front-end'], () =>
    nodemon({
        script: 'dist/app.js',
        gulpCmd: 'node_modules/.bin/gulp',
        watch: 'src',
        tasks: ['build']
    })
)