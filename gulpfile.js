const gulp = require('gulp');
const babel = require('gulp-babel');
const nodemon = require('gulp-nodemon');

gulp.task('default',['build','front-end','watch']);

gulp.task('build', () =>
    gulp.src('src/**/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('dist'))
        
);

gulp.task('front-end', () =>
    gulp.src('frontend/*')
        .pipe(gulp.dest('dist/public'))
);

gulp.task('watch', ['build','front-end'], () => 
    nodemon({
        script: 'dist/app.js'
        , gulpCmd: 'node_modules/.bin/gulp'
        , watch: 'src'
        , tasks: ['build'] 
    })
);