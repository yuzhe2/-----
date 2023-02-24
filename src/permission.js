import router from './router'


const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  // start progress bar
  let adminlogin = sessionStorage.getItem('adminlogin')
  let islogin = sessionStorage.getItem('islogin')

  if (to.path.includes('/admin') || to.path.includes('/care') || to.path == "/login") {
    if (adminlogin == null && to.path == '/login') {
      next()
    } else if (adminlogin == null && to.path !== '/login') {
      next('/login')
    } else if (adminlogin != null && to.path == '/login') {
      if (to.path.includes('/care')) next('/care')
      else next('/admin')
    } else {
      next()
    }
  } else {
    if (islogin == null && ['/mylogin', '/register'].includes(to.path)) {
      next()
    } else if (islogin == null && !['/mylogin', '/register'].includes(to.path)) {
      next('/mylogin')
    } else {
      next()
    }
  }
})

router.afterEach(() => {
})
