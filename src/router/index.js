import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/admin/login'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    redirect: '/news',
    hidden: true
  },

  // 前台
  {
    path: '/moments',
    component: () => import('@/views/moments'),
    meta: { title: '留言板', showTabbar: true },
    hidden: true
  },
  {
    path: '/news',
    component: () => import('@/views/news'),
    meta: { title: '热点', showTabbar: true },
    hidden: true
  },
  {
    path: '/newsdetail',
    component: () => import('@/views/newsdetail'),
    meta: { title: '热点详情', showTabbar: false },
    hidden: true
  },
  {
    path: '/submit',
    component: () => import('@/views/submit'),
    meta: { title: '选择预约', showTabbar: false },
    hidden: true
  },
  {
    path: '/add',
    component: () => import('@/views/add'),
    meta: { title: '发布留言', showTabbar: false },
    hidden: true
  },
  {
    path: '/mylogin',
    component: () => import('@/views/mylogin'),
    meta: { title: '登录', showTabbar: false },
    hidden: true
  },
  {
    path: '/register',
    component: () => import('@/views/register'),
    meta: { title: '注册', showTabbar: false },
    hidden: true
  },
  {
    path: '/orders',
    component: () => import('@/views/orders'),
    meta: { title: '我的预约', showTabbar: false },
    hidden: true
  },
  {
    path: '/home',
    component: () => import('@/views/home'),
    meta: { title: '首页', showTabbar: true },
    hidden: true
  },
  {
    path: '/detail',
    component: () => import('@/views/detail'),
    meta: { title: '医院详情', showTabbar: false },
    hidden: true
  },
  {
    path: '/my',
    component: () => import('@/views/my'),
    meta: { title: '我的', showTabbar: true },
    hidden: true
  },
  {
    path: '/editinfo',
    component: () => import('@/views/editinfo'),
    meta: { title: '个人信息', showTabbar: false },
    hidden: true
  },

  // 超级管理员后台
  {
    path: '/admin',
    component: Layout,
    redirect: '/admin/home',
    children: [
      {
        path: 'home',
        component: () => import('@/views/admin/index'),
        meta: { title: '后台首页', isadmin: true },
      },
      {
        path: 'admin',
        component: () => import('@/views/admin/admin'),
        meta: { title: '机构管理' }
      },
      {
        path: 'user',
        component: () => import('@/views/admin/user'),
        meta: { title: '用户管理' }
      },
      {
        path: 'vaccines',
        component: () => import('@/views/admin/vaccines'),
        meta: { title: '疫苗管理', isadmin: true }
      },
      {
        path: 'orders',
        component: () => import('@/views/admin/orders'),
        meta: { title: '订单管理', isadmin: true }
      },
      {
        path: 'news',
        component: () => import('@/views/admin/news'),
        meta: { title: '热点管理', isadmin: true }
      },
      {
        path: 'moments',
        component: () => import('@/views/admin/moments'),
        meta: { title: '留言板管理', isadmin: true }
      },
      {
        path: 'medical',
        component: () => import('@/views/admin/medical'),
        meta: { title: '医护人员管理', isadmin: true }
      }
    ]
  },

  {
    path: '/care',
    component: Layout,
    redirect: '/care/home',
    children: [
      {
        path: 'home',
        component: () => import('@/views/care/index.vue'),
        meta: { title: '后台首页', iscare: true },
      },
      {
        path: 'vaccines',
        component: () => import('@/views/care/vaccines.vue'),
        meta: { title: '疫苗管理', iscare: true }
      },
      {
        path: 'my',
        component: () => import('@/views/care/my.vue'),
        meta: { title: '个人信息', iscare: true }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
