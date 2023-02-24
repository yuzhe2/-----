const express = require('express');
const router = express.Router();
const mysqlInit = require('../utils/mysql');
const moment = require('moment');

/**
  * 数据表字段
  * @param id
  * @param name  疫苗名称
  * @param addr  地点
  * @param content  简介
  * @param timelist  可预约时间段,隔开
  * @param num  每时间段数量
  * @param aid  关联医疗机构
  * @param time  时间
 */

//疫苗表-获取列表
router.post('/getlist', async (req, res) => {
    const body = req.body
    let where = JSON.parse(JSON.stringify(req.body))
    let param = {}
    //清除为空的值
    Object.keys(where).forEach(item => {
        if (where[item] == '' || where[item] == null || where[item] == undefined) {
            delete where[item]
        } else {
            param['vaccines.' + item] = where[item]
        }
    })
    delete param['vaccines.offset']
    delete param['vaccines.limit']

    //模糊查询
    if (where['search']) {
        param['vaccines.name'] = ['like', '%' + where['search'] + '%']
        delete param['vaccines.search']
    }

    const data = await mysqlInit
        .table('vaccines')
        .alias('vaccines')
        .join({
            admin: {
                as: 'admin',
                on: { aid: 'id' },
            }
        })
        .where(param)
        .field(['vaccines.*', 'admin.name as aname'])
        .page(body.offset, body.limit)
        .select();
    res.json({ code: 200, data: data });
});


//疫苗表-获取单个
router.post('/getone', async (req, res) => {
    const body = req.body
    const data = await mysqlInit.table('vaccines').where({ id: body.id }).find();
    res.json({ code: 200, data: data });
});


//疫苗表-删除
router.post('/del', async (req, res) => {
    const body = req.body
    const { affectedRows } = await mysqlInit.table('vaccines').delete({ id: body.id });
    if (affectedRows > 0) {
        res.json({ code: 200, data: [], msg: '成功' });
    } else {
        res.json({ code: 300, data: [], msg: "失败" });
    }
});


//疫苗表-保存
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
        delete body.aname
        const { affectedRows } = await mysqlInit.table('vaccines').update(body, { id: body.id });
        row = affectedRows
    } else {
        const { affectedRows } = await mysqlInit.table('vaccines').add(body);
        row = affectedRows
    }

    if (row > 0) {
        res.json({ code: 200, data: [], msg: '成功' });
    } else {
        res.json({ code: 300, data: [], msg: "失败" });
    }
});



module.exports = router;

