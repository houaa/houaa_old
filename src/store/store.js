import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  login: false,
  showLoginModal: false,
  userInfo: '',
  allTeachers: '',
  loggedInUser: '',
  postProjectURL: 'https://api.houaa.xyz/index.php/api/teacher',
  teachURL: 'https://api.houaa.xyz/index.php/api/teachers',
  currentTeacher: {},
  superToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9ub3NzbC5ob3VhYS54eXoiLCJpcCI6IjEyNy4wLjAuMSIsImlkIjoiaGFvaGFvIiwicGhvbmUiOiIxMjM0NTY3ODkwMSIsImlhdCI6MTQ4ODEwNTkxOH0.2r47M-_GmiH591q4Yscp-Hbp8eWqN0k7eKlANlAtfg4'
}

const mutations = {
  userLogin(state) {
    state.login = true
    if (state.userInfo === '') {
      state.userInfo = {
        username: '临时用户'
      }
    }
  },
  userLogout(state) {
    state.login = false
  },
  showLoginModal(state) {
    state.showLoginModal = true
  },
  hideLoginModal(state) {
    state.showLoginModal = false
  },
  setUserInfo(state, info) {
    state.userInfo = info
  },
  setCurrentTeacher(state, teacher) {
    state.currentTeacher = {
      ...teacher
    }
  },
  setAllTeachers(state, teachers) {
    state.allTeachers = teachers
  },
  setLoggedInUser(state, user) {
    state.loggedInUser = user
  }
}

// const actions = {
//   login: ({ commit }) => commit('login'),
//   logout: ({ commit }) => commit('logout')
// }

const getters = {
  loggedIn: state => state.login,
  loginModal: state => state.showLoginModal,
  userInfo: state => state.userInfo,
  postProjectURL: state => state.postProjectURL,
  superToken: state => state.superToken,
  allTeachers: state => state.allTeachers,
  teachURL: state => state.teachURL,
  currentTeacher: state => state.currentTeacher,
  loggedInUser: state => state.loggedInUser
}

export default new Vuex.Store({
  state,
  getters,
  mutations
})
