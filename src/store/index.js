import Vue from 'vue'
import Vuex from 'vuex'

import config from './modules/config'
import user from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    config,
    user
  }
})
