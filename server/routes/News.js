const express = require('express');
const router = express.Router();
const mysqlInit = require('../utils/mysql');
const moment = require('moment');

/**
  * 数据表字段
  * @param id
  * @param name  标题
  * @param content  内容
  * @param img  图片
  * @param time  时间
 */

//资讯表-获取列表
router.post('/getlist', async (req, res) => {
    const body = req.body
    let where = JSON.parse(JSON.stringify(req.body))

    //清除为空的值
    Object.keys(where).forEach(item => {
        if (where[item] == '' || where[item] == null || where[item] == undefined) {
            delete where[item]
        }
    })
    delete where.offset
    delete where.limit

    //模糊查询
    if (where['search']) {
        where['name'] = ['like', '%' + where['search'] + '%']
        delete where['search']
    }

    const data = await mysqlInit.table('news').where(where).page(body.offset, body.limit).select();
    res.json({ code: 200, data: data });
});


//资讯表-获取单个
router.post('/getone', async (req, res) => {
    const body = req.body
    const data = await mysqlInit.table('news').where({ id: body.id }).find();
    res.json({ code: 200, data: data });
});


//资讯表-删除
router.post('/del', async (req, res) => {
    const body = req.body
    const { affectedRows } = await mysqlInit.table('news').delete({ id: body.id });
    if (affectedRows > 0) {
        res.json({ code: 200, data: [], msg: '成功' });
    } else {
        res.json({ code: 300, data: [], msg: "失败" });
    }
});


//资讯表-保存
router.post('/save', async (req, res) => {
    const body = req.body
    let time = new Date()
    let row = 0

    //清除为空的值
    Object.keys(body).forEach(item => {
        if (body[item] == '' || body[item] == null || body[item] == undefined) {
            delete body[item]
        }
    })

    //设置时间
    body.time = moment(time).format('YYYY-MM-DD HH:mm:ss');

    if (body.id) {
        const { affectedRows } = await mysqlInit.table('news').update(body, { id: body.id });
        row = affectedRows
    } else {
        const { affectedRows } = await mysqlInit.table('news').add(body);
        row = affectedRows
    }

    if (row > 0) {
        res.json({ code: 200, data: [], msg: '成功' });
    } else {
        res.json({ code: 300, data: [], msg: "失败" });
    }
});



module.exports = router;

