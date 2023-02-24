import request from '@/utils/request'

//前端数据传给后端

//上传
export function upload(params) {
  let form = new FormData()
  form.append('file', params)
  return request({
    baseURL: process.env.VUE_APP_BASE_FILE,
    headers: {
      "Content-Type": "multipart/form-data"
    },
    method: 'post',
    data: form
  })
}

//医疗机构表-查询单条数据
export function adminone(params) {
  return request({
    url: 'admin/getone',
    method: 'post',
    data: params
  })
}

//医疗机构表-查询列表数据
export function adminlist(params) {
  return request({
    url: 'admin/getlist',
    method: 'post',
    data: params
  })
}

//医疗机构表-删除
export function admindel(params) {
  return request({
    url: 'admin/del',
    method: 'post',
    data: params
  })
}

//医疗机构表-保存
export function adminsave(params) {
  return request({
    url: 'admin/save',
    method: 'post',
    data: params
  })
}



//预约表-查询单条数据
export function ordersone(params) {
  return request({
    url: 'orders/getone',
    method: 'post',
    data: params
  })
}

//预约表-查询列表数据
export function orderslist(params) {
  return request({
    url: 'orders/getlist',
    method: 'post',
    data: params
  })
}

//预约表-删除
export function ordersdel(params) {
  return request({
    url: 'orders/del',
    method: 'post',
    data: params
  })
}

//预约表-保存
export function orderssave(params) {
  return request({
    url: 'orders/save',
    method: 'post',
    data: params
  })
}


//用户表-查询单条数据
export function userone(params) {
  return request({
    url: 'user/getone',
    method: 'post',
    data: params
  })
}

//用户表-查询列表数据
export function userlist(params) {
  return request({
    url: 'user/getlist',
    method: 'post',
    data: params
  })
}

//用户表-删除
export function userdel(params) {
  return request({
    url: 'user/del',
    method: 'post',
    data: params
  })
}

//用户表-保存
export function usersave(params) {
  return request({
    url: 'user/save',
    method: 'post',
    data: params
  })
}


//疫苗表-查询单条数据
export function vaccinesone(params) {
  return request({
    url: 'vaccines/getone',
    method: 'post',
    data: params
  })
}

//疫苗表-查询列表数据
export function vaccineslist(params) {
  return request({
    url: 'vaccines/getlist',
    method: 'post',
    data: params
  })
}

//疫苗表-删除
export function vaccinesdel(params) {
  return request({
    url: 'vaccines/del',
    method: 'post',
    data: params
  })
}

//疫苗表-保存
export function vaccinessave(params) {
  return request({
    url: 'vaccines/save',
    method: 'post',
    data: params
  })
}


//资讯表-查询单条数据
export function newsone(params) {
  return request({
    url: 'news/getone',
    method: 'post',
    data: params
  })
}

//资讯表-查询列表数据
export function newslist(params) {
  return request({
    url: 'news/getlist',
    method: 'post',
    data: params
  })
}

//资讯表-删除
export function newsdel(params) {
  return request({
    url: 'news/del',
    method: 'post',
    data: params
  })
}

//资讯表-保存
export function newssave(params) {
  return request({
    url: 'news/save',
    method: 'post',
    data: params
  })
}


//交流圈表-查询单条数据
export function talkone(params) {
  return request({
    url: 'talk/getone',
    method: 'post',
    data: params
  })
}

//交流圈表-查询列表数据
export function talklist(params) {
  return request({
    url: 'talk/getlist',
    method: 'post',
    data: params
  })
}

//交流圈表-删除
export function talkdel(params) {
  return request({
    url: 'talk/del',
    method: 'post',
    data: params
  })
}

//交流圈表-保存
export function talksave(params) {
  return request({
    url: 'talk/save',
    method: 'post',
    data: params
  })
}


//评论表-查询单条数据
export function commitsone(params) {
  return request({
    url: 'commits/getone',
    method: 'post',
    data: params
  })
}

//评论表-查询列表数据
export function commitslist(params) {
  return request({
    url: 'commits/getlist',
    method: 'post',
    data: params
  })
}

//评论表-删除
export function commitsdel(params) {
  return request({
    url: 'commits/del',
    method: 'post',
    data: params
  })
}

//评论表-保存
export function commitssave(params) {
  return request({
    url: 'commits/save',
    method: 'post',
    data: params
  })
}


