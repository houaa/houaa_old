import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  login: false
}

const mutations = {
  userLogin (state) {
    state.login = true
  },
  userLogout (state) {
    state.login = false
  }
}

// const actions = {
//   login: ({ commit }) => commit('login'),
//   logout: ({ commit }) => commit('logout')
// }

const getters = {
  loggedIn: state => state.login
}

export default new Vuex.Store({
  state,
  getters,
  mutations
})
