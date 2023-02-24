const express = require('express');
const router = express.Router();
const mysqlInit = require('../utils/mysql');
const moment = require('moment');

/**
  * 数据表字段
  * @param id
  * @param uid  关联用户
  * @param content  评论
  * @param time  时间
  * @param tid  关联交友圈
 */

//评论表-获取列表
router.post('/getlist', async (req, res) => {
    const body = req.body
    let where = JSON.parse(JSON.stringify(req.body))
    let param = {}
    //清除为空的值
    Object.keys(where).forEach(item => {
        if (where[item] == '' || where[item] == null || where[item] == undefined) {
            delete where[item]
        } else {
            param['commits.' + item] = where[item]
        }
    })
    delete param['commits.offset']
    delete param['commits.limit']

    //模糊查询
    if (where['search']) {
        param['user.name'] = ['like', '%' + where['search'] + '%']
        delete param['commits.search']
    }

    const data = await mysqlInit
        .table('commits')
        .alias('commits')
        .join({
            user: {
                as: 'user',
                on: { uid: 'id' },
            }
        })
        .where(param)
        .field(['commits.*', 'user.name as uname', 'user.img as uimg'])
        .page(body.offset, body.limit)
        .select();
    res.json({ code: 200, data: data });
});

//评论表-获取单个
router.post('/getone', async (req, res) => {
    const body = req.body
    const data = await mysqlInit.table('commits').where({ id: body.id }).find();
    res.json({ code: 200, data: data });
});


//评论表-删除
router.post('/del', async (req, res) => {
    const body = req.body
    const { affectedRows } = await mysqlInit.table('commits').delete({ id: body.id });
    if (affectedRows > 0) {
        res.json({ code: 200, data: [], msg: '成功' });
    } else {
        res.json({ code: 300, data: [], msg: "失败" });
    }
});


//评论表-保存
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
        const { affectedRows } = await mysqlInit.table('commits').update(body, { id: body.id });
        row = affectedRows
    } else {
        const { affectedRows } = await mysqlInit.table('commits').add(body);
        row = affectedRows
    }

    if (row > 0) {
        res.json({ code: 200, data: [], msg: '成功' });
    } else {
        res.json({ code: 300, data: [], msg: "失败" });
    }
});



module.exports = router;

