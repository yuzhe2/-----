import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control
import NP from 'number-precision' //精度计算


// vant-ui
import 'vant/lib/index.less';
import Vant from 'vant';
Vue.use(Vant);

const moment = require("moment");
const tool = require('lodash');

Vue.use(ElementUI)


//重置data数据
Vue.prototype.resetData = (obj, that) => {
  that.$data[obj] = that.$options.data()[obj]
}

Vue.prototype.$moment = moment
Vue.prototype.$tool = tool
Vue.prototype.$sum = NP

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
