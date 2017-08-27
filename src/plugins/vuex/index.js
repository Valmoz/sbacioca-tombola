import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    db: {}
  },
  mutations: {
    dbInitialized (state, db) {
      state.db = db
    }
  }
})

export default store
