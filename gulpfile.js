const gulp = require("gulp"),
    sass = require("gulp-sass"),
    server = require("gulp-webserver"),
    cleanCss = require("gulp-clean-css");

//编译sass文件  //成功
gulp.task("devSass", () => {
    return gulp.src("./src/scss/*.scss").pipe(sass()).pipe(cleanCss()).pipe(gulp.dest("./src/css"));
})

//启服务  //成功
gulp.task("server", () => {
    return gulp.src("./src/").pipe(server({
        port: 8024,
        middleware: function(req, res, next) {
            console.log(44)
            res.end("")
        }
    }))
})