import del from 'del';
import gulp from 'gulp';
import pipeIf from "gulp-if";
import pug from "gulp-pug";
import plumberNotifier from "gulp-plumber-notifier";
import htmlReplace from 'gulp-html-replace';
import imagemin from 'gulp-imagemin';
import spritesmith from "gulp.spritesmith";
import svgSprite from "gulp-svg-sprite";
import inlineFonts from "gulp-inline-fonts";
import buffer from "vinyl-buffer";
import newer from "gulp-newer";
import stylus from "gulp-stylus";
import gcmq from "gulp-group-css-media-queries";
import rename from "gulp-rename";
import cssnano from 'gulp-cssnano';
import autoprefixer from "gulp-autoprefixer";
import uncss from "gulp-uncss-sp";
import glob from "glob";
import babel from "gulp-babel";
import uglify from "gulp-uglify";
import iconfont from "gulp-iconfont";
import iconfontCss from "gulp-iconfont-css";
import webpack from 'webpack-stream';
import browserSync from "browser-sync";
const env              = process.env.NODE_ENV;
// breakpoint ипользуются stylus и pug
// pug -> module picture
// stylus -> mixin imageSet, @media
const breakpoint = {
	sizeSmall: "480px",
	sizeMedium: "800px",
	sizeLarge: "991px",
	sizeExtraLarge: "1170px",
	sizeHD: "1440px"
};

function moveFont() {
	return gulp.src([
			'dev/lib/fonts/*',
			'./node_modules/font-awesome/fonts/*',
			'./node_modules/slick-carousel/slick/fonts/*'
		])
		.pipe(newer('build/fonts'))
		.pipe(gulp.dest('build/fonts'));
}

function moveJs() {
	return gulp.src([
			'dev/lib/js/*.js',
			'./node_modules/jquery/dist/jquery.min.js',
			'./node_modules/@babel/polyfill/dist/polyfill.min.js',
			'./node_modules/slick-carousel/slick/slick.min.js',
			'./dev/lib/js/prism.js'
		])
		.pipe(newer('build/js'))
		.pipe(gulp.dest('build/js'));
}

function moveCssModules() {
	return gulp.src([
		'./node_modules/slick-carousel/slick/slick.css',
		'./node_modules/slick-carousel/slick/slick-theme.css'
	])
	.pipe(newer('dev/stylus/modules'))
	.pipe(gulp.dest('dev/stylus/modules'));
}

function moveCss() {
	return gulp.src([
		'./dev/lib/css/prism.css'
	])
	.pipe(newer('build/css'))
	.pipe(gulp.dest('build/css'));
}

function sync() {
	return browserSync({
		server: {
			baseDir: 'build'
		},
		notify: false
	});
}

function pugToHtml() {
	return gulp.src(['dev/pug/**/*.pug', '!dev/pug/layout.pug', '!dev/pug/_*.pug'])
		.pipe(plumberNotifier())
		.pipe(pug({ pretty: true, locals: breakpoint }))
		.pipe(pipeIf(env === 'production', htmlReplace({
			css: 'css/style.min.css',
			js_app: 'js/app.min.js',
			js_script: 'js/script.min.js'
		})))
		.pipe(gulp.dest('build'))
		.pipe(browserSync.reload({ stream: true }));
}

function img() {
	return gulp.src([
		'dev/img/**/*.*',
		'!dev/img/sprite-svg/*.*',
		'!dev/img/sprite-png/**/*.*',
		'!dev/img/icon-font/**/*.*'
	])
	.pipe(newer('build/img'))
	.pipe(pipeIf(env === 'production', imagemin()))
	.pipe(gulp.dest('build/img'));
}

function stylusToCss() {
	return gulp.src('dev/stylus/main.styl')
		.pipe(plumberNotifier())
		.pipe(stylus({ 'include css': true, rawDefine: { ...breakpoint }}))
		.pipe(pipeIf(env === 'production', uncss({
				// html: ['./build/index.html']
				html: glob.sync('./build/**/*.html')
		})))
		.pipe(pipeIf(env === 'production', autoprefixer({
			cascade: false,
			grid: "autoplace" // для поддержки grid в IE11
		})))
		.pipe(pipeIf(env === 'production', gcmq()))
		.pipe(pipeIf(env === 'production', cssnano()))
		.pipe(pipeIf(env === 'production', rename({suffix: '.min'})))
		.pipe(gulp.dest('build/css'))
		.pipe(browserSync.reload({ stream: true }));
}

async function spritePng() {
	var spriteData = gulp.src('dev/img/iconpng/**/*.png').pipe(spritesmith({
				imgName: 'iconpng.png',
				cssName: '_sprite.styl',
				cssFormat: 'stylus',
				imgPath: '../img/sprite/iconpng.png'
		}));
		spriteData.img
			.pipe(buffer())
			.pipe(pipeIf(env === 'production', imagemin()))
			.pipe(gulp.dest('dev/img/sprite'));
		spriteData.css
			.pipe(gulp.dest('dev/stylus/modules'));
}

function spriteSvg() {
	return gulp.src('dev/img/iconsvg/*.svg')
		.pipe(svgSprite({
			shape: {
				id: {
					generator: function(name, file) {
						return 'iconsvg-' + file.stem;
					}
				},
				dimension: {
					maxWidth: 32,
					maxHeight: 32
				},
				spacing: {
					padding: 0,
				}
			},
			mode: {
				inline: true,
				symbol: true
			},
		}))
		.on('end', () => {
			gulp.src('dev/img/sprite/symbol/svg/sprite.symbol.svg')
				.pipe(rename({
					basename: "iconsvg",
					extname: ".svg"
				}))
				.pipe(gulp.dest('dev/img/sprite'))
		})
		.on('end', () => {
			del(['dev/img/sprite/symbol'])
		})
}

function svgToFont() {
	const runTimestamp = Math.round(Date.now()/1000);
	return gulp.src(['dev/img/iconfont/*.svg'])
		.pipe(iconfontCss({
			fontName: 'iconfont',
			// path: 'app/assets/css/templates/_icons.scss',
			targetPath: '../../dev/stylus/modules/_iconfont.css',
			fontPath: '../fonts/',
			cssClass: 'iconfont'
		}))
		.pipe(iconfont({
			fontName: 'iconfont', // required
			prependUnicode: true, // recommended option
			formats: ['ttf', 'eot', 'woff', 'woff2', 'svg'], // default, 'woff2' and 'svg' are available
			timestamp: runTimestamp, // recommended to get consistent builds when watching files
		}))
		//.on('glyphs', function(glyphs, options) {
			// CSS templating, e.g.
			//console.log(glyphs, options);
		//})
		.pipe(gulp.dest('build/fonts/'));
}

function fontBase64() {
	return gulp.src(['dev/lib/fonts/*'])
		.pipe(inlineFonts({ name: 'NairiNormal' }))
		.pipe(gulp.dest('dev/stylus/modules/'));
}

function js() {
	return (
    gulp
      .src("dev/js/**/*.js", { sourcemaps: true })
      .pipe(plumberNotifier())
      .pipe(babel({
				"presets": [["@babel/preset-env", { modules: false }]],
			}))
			.pipe(pipeIf(env === "production", webpack({
				entry: {
					// app: ['babel-polyfill'],
					app: './dev/js/script.js',
					script: './dev/js/script.js'
				},
				mode: env,
				output: {
					filename: '[name].js',
				}
			})))
      .pipe(pipeIf(env === "production", uglify()))
      .pipe(pipeIf(env === "production", rename({ suffix: ".min" })))
      .pipe(gulp.dest("build/js", { sourcemaps: true }))
      .pipe(browserSync.reload({ stream: true }))
  );
}

function watch() {
	gulp.watch('dev/pug/**/*.pug', pugToHtml);
	gulp.watch('dev/img/**/*.*', img);
	gulp.watch('dev/stylus/**/*.styl', stylusToCss);
	gulp.watch('dev/js/**/*.js', js);
}

// очистка папки build
export function clear() {
	return del(['build/*']);
}

// создание спрайтов png и svg
export const sprite = gulp.parallel(spritePng, spriteSvg);

// созадние из svg шрифта и преобразование шрифта в base64
export const font = gulp.parallel(svgToFont, fontBase64);

// перемещение шрифтов и js библиотек
export const move = gulp.parallel(moveFont, moveJs, moveCss, moveCssModules);

// инициализация
export const init = gulp.series(clear, gulp.parallel(sprite, font, move));

const task = [
	pugToHtml,
	img,
	stylusToCss,
	js
];

// компиляция проекта, сжатие файлов (js, css), оптимизация изображений
export const build = gulp.series(clear, move, gulp.parallel(...task));
// разработка
const dev = gulp.parallel(move, sync, ...task, watch);
export default dev;