import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    seatObj: null, // 绘图编辑器里全局canvas
  },
  mutations,
  actions,
  modules: {
  },
  getters,
})
