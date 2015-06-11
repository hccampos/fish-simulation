var gulp = require('gulp');
var typescript = require('gulp-typescript');
var concat = require('gulp-concat');
var del = require('del');
var merge = require('merge2');
var less = require('gulp-less');

var paths = {
	html: ['game/src/**/*.html'],
	styles: ['game/src/**/*.less'],
	scripts: ['game/src/**/*.ts'],
	vendor: ['game/vendor/**/*.*']
};

//------------------------------------------------------------------------------

gulp.task('clean', function(cb) {
	del(['build'], cb);
});

//------------------------------------------------------------------------------

gulp.task('vendor', ['clean'], function() {
	return gulp.src(paths.vendor).pipe(gulp.dest('build/vendor'));
});

gulp.task('html', ['clean'], function () {
	return gulp.src(paths.html).pipe(gulp.dest('build'));
});

gulp.task('styles', ['clean'], function () {
	return gulp.src(paths.styles)
		.pipe(less())
		.pipe(gulp.dest('build/styles'));
});

gulp.task('scripts', ['clean'], function() {
	var vendorResult = gulp.src(paths.vendor)
		.pipe(gulp.dest('build/vendor'));

	var tsResult = gulp.src(paths.scripts)
		.pipe(typescript({
			declarationFiles: true,
			noExternalResolve: false,
			module: 'amd',
			target: 'es5'
		}));

	return merge([
		vendorResult,
		tsResult.dts.pipe(gulp.dest('build/definitions')),
		tsResult.js.pipe(gulp.dest('build/js'))
	]);
});

// Rerun the task when a file changes
gulp.task('watch', function() {
	gulp.watch(paths.scripts, ['build']);
	gulp.watch(paths.html, ['build']);
	gulp.watch(paths.vendor, ['build']);
	gulp.watch(paths.styles, ['build']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('build', ['clean', 'scripts', 'styles', 'vendor', 'html', 'watch']);
gulp.task('default', ['build']);