import Vue from 'vue'
import Vuex from 'vuex'
import AV from 'leancloud-storage'

Vue.use(Vuex)

const state = {
  login: false,
  showLoginModal: false,
  userInfo: '',
  allTeachers: '',
  postProjectURL: 'https://api.houaa.xyz/index.php/api/teacher',
  teachURL: 'https://api.houaa.xyz/index.php/api/teachers',
  currentTeacher: {},
  superToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9ub3NzbC5ob3VhYS54eXoiLCJpcCI6IjEyNy4wLjAuMSIsImlkIjoiaGFvaGFvIiwicGhvbmUiOiIxMjM0NTY3ODkwMSIsImlhdCI6MTQ4ODEwNTkxOH0.2r47M-_GmiH591q4Yscp-Hbp8eWqN0k7eKlANlAtfg4',
  user: {
    name: '',
    sex: 1,
    auth: true,
    grade: '',
    rate: 0,
    salary: 0,
    highestSalary: 0,
    teach: [],
    availableTime: [],
    tags: [],
    selfIntro: '',
    rankRate: 0
  }
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
  setCurrentTeacher(state, teacher) {
    state.currentTeacher = {
      ...teacher
    }
  },
  setAllTeachers(state, teachers) {
    state.allTeachers = teachers
  },
  setUserInfo(state, info) {
    state.user = info
  },
  setName(name) {
    state.user.name = name
  }
}

const actions = {
  async getInfo(context, AVuser) {
    context.commit('setUserInfo', {
      name: AVuser.attributes.name,
      sex: AVuser.attributes.sex,
      auth: AVuser.attributes.auth,
      grade: AVuser.attributes.grade,
      rate: AVuser.attributes.rate,
      salary: AVuser.attributes.salary,
      highestSalary: AVuser.attributes.highestSalary,
      teach: AVuser.attributes.teach,
      availableTime: AVuser.attributes.availableTime,
      tags: AVuser.attributes.tags,
      selfIntro: AVuser.attributes.selfIntro
    })
  },
  async setName(context, name) {
    const AVuser = await AV.User.current()
    context.commit('setName', name)
    AVuser.set('name', name)
    await AVuser.save()
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
  user: state => state.user
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
