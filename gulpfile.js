var gulp = require('gulp'),
    mocha = require('gulp-spawn-mocha'),
    ts = require('gulp-typescript'),
    sourceMap = require('gulp-sourcemaps'),
    webpack = require('webpack'),
    del = require('del'),
    webpackDevMidlleware = require('webpack-dev-middleware'),
    webpackHotMiddleware = require('webpack-hot-middleware'),
    browserSync = require('browser-sync').create();

var webpackConfig = require('./webpack.config');

var DEGUG = process.env.NODE_ENV ==='debug',
    CI = process.env.CI === true;

gulp.task('browser', () => {
    var bundle = webpack(webpackConfig.Config, (err) => { err ? console.log(err) : null })
    browserSync.init({
        server: {
            baseDir: './dist',
            index: 'index.html'
        },
        middleware: [
            webpackDevMidlleware(bundle, {
                publicPath: webpackConfig.Config.output.publicPath,
                stats: { color: true }
            }),
            webpackHotMiddleware(bundle)
        ],
        files: [
            './src/**/*.pug', './src/**/*.{ts,tsx}'
        ]
    })
})

gulp.task('webpack',()=>{
    webpack(webpackConfig.Config, (err) => { err ? console.log(err) : null })
})

gulp.task('test', () => {
    browserSync.init({
        server: {
            baseDir: 'mochawesome-reports',
            index: 'mochawesome.html'
        },
        files: ['mochawesome-reports/mochawesome.html']
    })
    // gulp.watch('test/reducer/*.ts',['test:ts']);
    // gulp.watch(['test/reducer/*.ts'], ['mocha']).on('change',browserSync.reload)
    gulp.watch(['test/reducer/*.{ts,tsx}'], ['mocha'])
})

gulp.task('mocha',['test:ts'], () => {
    return gulp.src(['test/build/test/reducer/reducer.test.js'],{read:false})
        .pipe(mocha({
            R: 'mochawesome'
        }))
})

gulp.task('test:ts',()=>{
    var tsProject = ts.createProject('tsconfigTest.json');
    return tsProject.src().pipe(sourceMap.init()).pipe(ts(tsProject)).pipe(sourceMap.write('./')).pipe(gulp.dest('test/build'));
})

gulp.task('clean:test',()=>{
    del.sync('test/build');
})

gulp.task('clean:dist',()=>{
    del.sync('dist');
})

gulp.task('clean',['clean:test','clean:dist'])