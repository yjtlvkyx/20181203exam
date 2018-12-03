const gulp = require("gulp"),
    sass = require("gulp-sass"),
    server = require("gulp-webserver");

//启服务 //成功
gulp.task("server", () => {
    return gulp.src("./src/").pipe(server({
        port: 8024,
        middleware: function(req, res, next) {
            console.log(44)
            res.end("")
        }
    }))
})