const express = require('express');
const router = express.Router();
const multer = require('multer') //实现文件上传
const fs = require("fs");
const md5 = require('js-md5'); //加密
const tool = require('lodash');//提供函数式编程的实用功能，实用工具库


//上传图片
router.post('/', multer({
    //设置文件存储路径
    dest: 'upload/'   //upload文件如果不存在则会自己创建一个。
}).single('file'), function (req, res, next) {
    if (req.file.length === 0) {  //判断一下文件是否存在，也可以在前端代码中进行判断。
        res.render("error", { message: "上传文件不能为空！" });
        return
    } else {
        //获取文件
        let file = req.file;
        //获取文件后缀
        let suffix = file.originalname.split('.')[file.originalname.split('.').length - 1]
        let now = new Date();
        //设置新的文件名
        let name = now.getFullYear().toString() + now.getMonth() + now.getDate() + md5(tool.random(151651, 845644, false).toString()) + `.${suffix}`
        //保存文件
        fs.renameSync('./upload/' + file.filename, './upload/' + name);

        // 设置响应类型及编码
        res.set({
            'content-type': 'application/json; charset=utf-8'
        });
        res.json({ code: 200, data: `http://localhost:5000/files/${name}` });
    }
});


module.exports = router;