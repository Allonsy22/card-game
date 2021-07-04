import Vue from 'vue'
import Vuex from 'vuex'

import localGameModule from './modules/localGame'
import navigationModule from './modules/navigation'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    localGameModule,
    navigationModule
  }
})
