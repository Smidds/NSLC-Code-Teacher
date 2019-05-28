import Vue from 'vue'
import Vuex from 'vuex'

import chapters from './chapters'

Vue.use(Vuex)

export default () => {
  const Store = new Vuex.Store({
    modules: {
      chapters
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })

  return Store
}
