var gulp = require('gulp');
var sass = require('gulp-sass');
var cleanCss = require('gulp-clean-css');
var rename = require('gulp-rename');
var jade = require( 'gulp-jade' );

var paths = {
  sass: ['./scss/**/*.scss'],
  jade: ['./jade/**/*.jade']
};

gulp.task('default', ['sass', 'jade']);

gulp.task( 'jade', function (done) {
  gulp.src( paths.jade )
    .pipe( jade() )
    .pipe( gulp.dest( './www/templates/' ) )
    .on( 'end', done );
} );

gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('./www/css/'))
    .pipe(cleanCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('watch', ['sass'], function() {
  gulp.watch(paths.sass, ['sass']);
  gulp.watch( paths.jade, ['jade'] );
});
