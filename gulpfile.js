// Load Gulp
const { src, dest, task, series } = require('gulp');

// CSS related plugins
var concat = require('gulp-concat');
var autoprefixer = require( 'gulp-autoprefixer' );

// // JS related plugins
var uglify = require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');

// // Utility plugins
var sourcemaps   = require( 'gulp-sourcemaps' );

// // Project related variables
var mapURL       = '.';


// // Admin section related variables

// // Admin CSS related variables
var AdminCSSURL     = './assets/build/admin/css/';

var AdminCSSDashboard     = 'assets/src/admin/css/dashboard.css';
var AdminCSSPrice     	= 'assets/src/admin/css/crypto-price.css';

var AdminCSSFiles      = [AdminCSSDashboard, AdminCSSPrice];

// // Admin js related variables
var AdminJsURL        = './assets/build/admin/js/';

var AdminJsDashboard    = 'assets/src/admin/js/dashboard.js';
var AdminJsPrice     	= 'assets/src/admin/js/crypto-price.js';

var AdminJsFiles      = [AdminJsDashboard, AdminJsPrice];


// // Public section related variables


// // Functions

function AdminCSS(done) {
	src(AdminCSSFiles)
		.pipe( sourcemaps.init() )
		.pipe( autoprefixer({
			cascade: false
		}) )
        .pipe( cleanCSS() )
		// .pipe( sourcemaps.write( mapURL ) )
		.pipe( dest( AdminCSSURL ) )
	done();
}

function AdminJs(done) {
	src(AdminJsFiles)
        .pipe( sourcemaps.init() )
		.pipe( uglify() )
		// .pipe( sourcemaps.write( mapURL ) )
		.pipe( dest( AdminJsURL ) )
	done();
}

task("css", AdminCSS);
task("js", AdminJs);
task("default", series(AdminCSS, AdminJs));


// var AdminCSSOutput     = 'admin-aioc.css';
// var AdminJsOutput     = 'admin-aioc.js';
// function AdminCSS(done) {
// 	src(AdminCSSFiles)
// 		.pipe( sourcemaps.init() )
// 		.pipe( autoprefixer({
// 			cascade: false
// 		}) )
//         .pipe( concat( AdminCSSOutput ) )
//         .pipe( cleanCSS() )
// 		.pipe( sourcemaps.write( mapURL ) )
// 		.pipe( dest( AdminCSSURL ) )
// 	done();
// }