import Vue from 'vue'
import Vuex from 'vuex'
import AV from 'leancloud-storage'

Vue.use(Vuex)

const state = {
  showLoginModal: false,
  userInfo: '',
  allTeachers: '',
  allStudents: '',
  loggedInUser: '',
  postProjectURL: 'https://api.houaa.xyz/index.php/api/teacher',
  teachURL: 'https://api.houaa.xyz/index.php/api/teachers',
  currentTeacher: {},
  allReserve: '',
  reserveIsDirty: true,
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
    rankRate: 0,
    role: ''
  }
}

const mutations = {
  userLogin(state, user) {
    state.userInfo = user
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
    state.currentTeacher = teacher
  },
  setReserveDirty(state, isDirty) {
    state.reserveIsDirty = isDirty
  },
  setAllTeachers(state, teachers) {
    state.allTeachers = teachers
  },
  setAllStudents(state, students) {
    state.allStudents = students
  },
  setReserve(state, reserve) {
    state.reserveIsDirty = false
    state.allReserve = reserve
  },
  setUserInfo(state, info) {
    state.user = info
  },
  setName(state, name) {
    state.user.name = name
  },
  toggleTeach(state, [eduRank, classes]) {
    const newTeach = [...state.user.teach]
    newTeach[eduRank][classes] = !newTeach[eduRank][classes]
    state.user.teach = newTeach
  },
  toggleCalendar(state, [day, time]) {
    const newAvailableTime = [...state.user.availableTime]
    newAvailableTime[day][time] = !newAvailableTime[day][time]
    state.user.availableTime = newAvailableTime
  },
  deleteTag(state, tag) {
    state.user.tags.splice(state.user.tags.indexOf(tag), 1)
  },
  addTag(state, tag) {
    state.user.tags.push(tag)
  },
  inputText(state, [attr, content]) {
    state.user[attr] = content
  }
}

const actions = {
  async getInfo(context, AVuser) {
    context.commit('setUserInfo', {
      name: AVuser.attributes.name,
      sex: AVuser.attributes.sex,
      auth: AVuser.attributes.auth,
      grade: AVuser.attributes.grade || '本科一年级',
      rate: AVuser.attributes.rate,
      salary: AVuser.attributes.salary,
      highestSalary: AVuser.attributes.highestSalary,
      teach: AVuser.attributes.teach || [[1, 1], [1, 1, 1], [1, 1, 1]],
      availableTime: AVuser.attributes.availableTime || [[1, 1, 1], [1, 1, 1], [1, 1, 1], [1, 1, 1], [1, 1, 1], [1, 1, 1], [1, 1, 1]],
      tags: AVuser.attributes.tags || [],
      selfIntro: AVuser.attributes.selfIntro,
      role: AVuser.attributes.role,
      createdAt: AVuser.getCreatedAt()
    })
  },
  async submitToAV(context) {
    const AVuser = AV.User.current()

    if (context.state.user['role']) {
      const teacherQuery = new AV.Query('TeacherList')
      const result = await teacherQuery.equalTo('id', AVuser.id).find()
      if (result.length === 0) {
        const TeacherList = AV.Object.extend('TeacherList')
        const newTeacher = new TeacherList()
        await newTeacher.save({
          ...context.state.user,
          id: AVuser.id
        })
      } else {
        const TeacherUser = result[0]
        for (const key in context.state.user) {
          TeacherUser.set(key, context.state.user[key])
        }
        await TeacherUser.save()
      }
    } else if (context.state.user['role'] === false) {
      const studentQuery = new AV.Query('StudentList')
      const result = await studentQuery.equalTo('id', AVuser.id).find()
      if (result.length === 0) {
        const StudentList = AV.Object.extend('StudentList')
        const newStudent = new StudentList()
        await newStudent.save({
          ...context.state.user,
          id: AVuser.id
        })
      } else {
        const StudentUser = result[0]
        for (const key in context.state.user) {
          StudentUser.set(key, context.state.user[key])
        }
        await StudentUser.save()
      }
    }

    for (const key in context.state.user) {
      AVuser.set(key, context.state.user[key])
    }
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
  allStudents: state => state.allStudents,
  teachURL: state => state.teachURL,
  currentTeacher: state => state.currentTeacher,
  user: state => state.user,
  reserveInfo: state => state.allReserve,
  isReserveDirty: state => state.reserveIsDirty,
  createTime: state => state.createdAt
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
