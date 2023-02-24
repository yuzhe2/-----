const express = require('express');
const router = express.Router();
const mysqlInit = require('../utils/mysql');
const moment = require('moment');

/**
  * 数据表字段
  * @param id
  * @param uid  关联用户id
  * @param status  状态 未完成 已完成 已退 已作废
  * @param time  时间
  * @param aid  关联医疗结构
  * @param vid  关联疫苗
  * @param booktime  预约时间段
  * @param day  预约日期
 */

//预约表-获取列表
router.post('/getlist', async (req, res) => {
    const body = req.body
    let where = JSON.parse(JSON.stringify(req.body))
    let param = {}
    //清除为空的值
    Object.keys(where).forEach(item => {
        if (where[item] == '' || where[item] == null || where[item] == undefined) {
            delete where[item]
        } else {
            param['orders.' + item] = where[item]
        }
    })
    delete param['orders.offset']
    delete param['orders.limit']

    //模糊查询
    if (where['search']) {
        param['orders.name'] = ['like', '%' + where['search'] + '%']
        delete param['orders.search']
    }

    const data = await mysqlInit
        .table('orders')
        .alias('orders')
        .join({
            admin: {
                as: 'admin',
                on: { aid: 'id' },
            }
        })
        .join({
            vaccines: {
                as: 'vaccines',
                on: { vid: 'id' },
            }
        })
        .join({
            user: {
                as: 'user',
                on: { uid: 'id' },
            }
        })
        .where(param)
        .field(['orders.*', 'admin.name as aname', 'admin.tel as atel', 'vaccines.name as vname', 'vaccines.addr as vaddr', 'user.name as uname', 'user.cardid as ucardid'])
        .page(body.offset, body.limit)
        .select();
    res.json({ code: 200, data: data });
});



//预约表-获取单个
router.post('/getone', async (req, res) => {
    const body = req.body
    const data = await mysqlInit.table('orders').where({ id: body.id }).find();
    res.json({ code: 200, data: data });
});


//预约表-删除
router.post('/del', async (req, res) => {
    const body = req.body
    const { affectedRows } = await mysqlInit.table('orders').delete({ id: body.id });
    if (affectedRows > 0) {
        res.json({ code: 200, data: [], msg: '成功' });
    } else {
        res.json({ code: 300, data: [], msg: "失败" });
    }
});


//预约表-保存
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
        const { affectedRows } = await mysqlInit.table('orders').update(body, { id: body.id });
        row = affectedRows
    } else {
        const { affectedRows } = await mysqlInit.table('orders').add(body);
        row = affectedRows
    }

    if (row > 0) {
        res.json({ code: 200, data: [], msg: '成功' });
    } else {
        res.json({ code: 300, data: [], msg: "失败" });
    }
});



module.exports = router;

