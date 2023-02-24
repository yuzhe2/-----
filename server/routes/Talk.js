const express = require('express');
const router = express.Router();
const mysqlInit = require('../utils/mysql');
const moment = require('moment');

/**
  * 数据表字段
  * @param id
  * @param content  内容
  * @param imgs  图片
  * @param uid  关联用户id
  * @param time  时间
 */

//交流圈表-获取列表
router.post('/getlist', async (req, res) => {
    const body = req.body
    let where = JSON.parse(JSON.stringify(req.body))
    let param = {}
    //清除为空的值
    Object.keys(where).forEach(item => {
        if (where[item] == '' || where[item] == null || where[item] == undefined) {
            delete where[item]
        } else {
            param['talk.' + item] = where[item]
        }
    })
    delete param['talk.offset']
    delete param['talk.limit']

    //模糊查询
    if (where['search']) {
        param['user.name'] = ['like', '%' + where['search'] + '%']
        delete param['talk.search']
    }

    const data = await mysqlInit
        .table('talk')
        .alias('talk')
        .join({
            user: {
                as: 'user',
                on: { uid: 'id' },
            }
        })
        .where(param)
        .field(['talk.*', 'user.name as uname', 'user.img as uimg'])
        .page(body.offset, body.limit)
        .select();

    // 获取评论
    if (data.list.length) {
        for (const key in data.list) {
            const commitlist = await mysqlInit
                .table('commits')
                .alias('commits')
                .join({
                    user: {
                        as: 'user',
                        on: { uid: 'id' },
                    }
                })
                .where({ tid: data.list[key].id })
                .field(['commits.*', 'user.name as uname', 'user.img as uimg'])
                .select();
            data.list[key].commitlist = commitlist
            data.list[key].imgs = data.list[key].imgs.split(',')
        }
    }
    res.json({ code: 200, data: data });
});

//交流圈表-获取单个
router.post('/getone', async (req, res) => {
    const body = req.body
    const data = await mysqlInit.table('talk').where({ id: body.id }).find();
    res.json({ code: 200, data: data });
});


//交流圈表-删除
router.post('/del', async (req, res) => {
    const body = req.body
    const { affectedRows } = await mysqlInit.table('talk').delete({ id: body.id });
    if (affectedRows > 0) {
        res.json({ code: 200, data: [], msg: '成功' });
    } else {
        res.json({ code: 300, data: [], msg: "失败" });
    }
});


//交流圈表-保存
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
        const { affectedRows } = await mysqlInit.table('talk').update(body, { id: body.id });
        row = affectedRows
    } else {
        const { affectedRows } = await mysqlInit.table('talk').add(body);
        row = affectedRows
    }

    if (row > 0) {
        res.json({ code: 200, data: [], msg: '成功' });
    } else {
        res.json({ code: 300, data: [], msg: "失败" });
    }
});



module.exports = router;

