import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    db: {},
    matches: {},
    tickets: {}
  },
  mutations: {
    dbInitialized (state, db) {
      state.db = db
    },
    matchesLoaded (state, matches) {
      state.matches = matches
    },
    ticketsLoaded (state, tickets) {
      state.tickets = tickets
    }
  }
})

export default store
