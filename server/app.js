var express = require('express');
//用于处理目录的对象，提高开发效率
var path = require('path');

//解析客户端请求的body中的内容,内部使用JSON编码处理,url编码处理以及对于文件的上传处理
var bodyParser = require('body-parser');
const cors = require('cors');

const mysqlInit = require('./utils/mysql');
const moment = require('moment');

var app = express();  //生成一个express实例 app

//解决跨域
app.use(cors())

// 轮询设置过期
setInterval(async () => {
    const data = await mysqlInit.table('orders').where({ status: '未完成' }).select();
    for (const key in data) {
        let row = data[key];
        if (moment(`${row.day} ${row.booktime.split('-')[1]}:00`).valueOf() < moment().valueOf() && row.status == '未完成') {
            // 设置为已作废
            await mysqlInit.table('orders').update({
                status: '已作废'
            }, { id: row.id });

            console.log(`已设置过期订单: id=${row.id}`);
        }
    }
}, 10000)

//静态访问目录
//localhost:5000/files 访问upload下静态资源
app.use('/files', express.static('upload'))

//入参中间件
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//接口路由
app.use('/Admin', require('./routes/Admin'));
app.use('/Orders', require('./routes/Orders'));
app.use('/User', require('./routes/User'));
app.use('/Vaccines', require('./routes/Vaccines'));
app.use('/Upload', require('./routes/Upload'));
app.use('/Commits', require('./routes/Commits'));
app.use('/News', require('./routes/News'));
app.use('/Talk', require('./routes/Talk'));

// 捕获404错误，并转发到错误处理器
app.use(function (req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
// 生产环境下的错误处理器，将错误信息渲染error模版并显示到浏览器中
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

//导出app实例供其他模块调用
module.exports = app;
