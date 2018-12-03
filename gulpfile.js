const gulp = require("gulp"),
    sass = require("gulp-sass"),
    server = require("gulp-webserver"),
    cleanCss = require("gulp-clean-css"),
    babel = require("gulp-babel"),
    uglify = require("gulp-uglify"),
    concat = require("gulp-concat"),
    fs = require("fs"),
    path = require("path"),
    url = require("url");

//编译sass文件  //成功
gulp.task("devSass", () => {
    return gulp.src("./src/scss/*.scss").pipe(sass()).pipe(cleanCss()).pipe(gulp.dest("./src/css"));
})

//编译js文件，进行压缩  //成功
gulp.task("devJs", () => {
    return gulp.src("./src/js/*.js")
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(concat("all.js"))
        .pipe(gulp.dest("./src/scripts"));
})

//启服务  //成功
gulp.task("server", () => {
    return gulp.src("./src/").pipe(server({
        port: 8024,
        open: true,
        middleware: function(req, res, next) {
            console.log(44)
            if (req.url == "/favicon.ico") {
                res.end("")
                return;
            }
            let pathname = url.parse(req.url).pathname;
            pathname = req.url == "/" ? "./index.html" : pathname;
            pathname = path.join(__dirname, "src", pathname)
            let files = fs.readFileSync(pathname)
            res.end(files)
        }
    }))
})

//监听事件  //成功
gulp.task("watch", () => {
    return gulp.watch("./src/scss/*.scss", gulp.series("devSass", "devJs", "server"));
})

//整合任务  //成功
gulp.task("default", gulp.series("devSass", "devJs", "server", "watch"));