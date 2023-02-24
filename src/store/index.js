import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
  },
  getters,
  state: {
    aid: null
  },
  mutations: {
    changeAid (state, aid) {
      state.aid = aid
    }
  }
})

export default store
