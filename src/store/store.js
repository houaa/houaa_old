import Vue from 'vue'
import Vuex from 'vuex'
// import AV from 'leancloud-storage'

Vue.use(Vuex)

const state = {
  showLoginModal: false,
  userInfo: '',
  allTeachers: '',
  allStudents: '',
  orderedOne: '',
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
    grade: 1,
    edu: 1,
    rate: 0,
    salary: 0,
    highestSalary: 0,
    teach: [],
    availableTime: [[0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 1, 1], [0, 1, 1]], // 默认空闲时间为周末下午和晚上
    tags: [],
    selfIntro: '',
    rankRate: 0,
    role: '',
    createdAt: {},
    campus: ''
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
  setOrdered(state, person) {
    state.orderedOne = person
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
    window.preventWindowClose = true
    state.user.teach[eduRank].subjects[classes].checked = !state.user.teach[eduRank].subjects[classes].checked
  },
  toggleOrderTeach(state, [eduRank, classes]) {
    window.preventWindowClose = true
    const newTeach = [...state.orderedOne.teach]
    newTeach[eduRank][classes] = !newTeach[eduRank][classes]
    state.orderedOne.teach = newTeach
  },
  toggleCalendar(state, [day, time]) {
    window.preventWindowClose = true
    const newAvailableTime = []
    for (let i = 0; i <= 6; i++) {
      newAvailableTime[i] = []
      for (let j = 0; j <= 3; j++) {
        newAvailableTime[i][j] = state.user.availableTime[i][j]
      }
    }
    newAvailableTime[day][time] = !newAvailableTime[day][time]
    state.user.availableTime = newAvailableTime
  },
  toggleOrderCalendar(state, [day, time]) {
    window.preventWindowClose = true
    const newAvailableTime = [...state.orderedOne.availableTime]
    newAvailableTime[day][time] = !newAvailableTime[day][time]
    state.orderedOne.availableTime = newAvailableTime
  },
  deleteTag(state, tag) {
    window.preventWindowClose = true
    state.user.tags.splice(state.user.tags.indexOf(tag), 1)
  },
  addTag(state, tag) {
    window.preventWindowClose = true
    state.user.tags.push(tag)
  },
  inputText(state, [attr, content]) {
    state.user[attr] = content
  }
}

const fromGradeIdToEdu = (id) => {
  if (id === null) id = 1
  if (id <= 3) return 0
  else if (id <= 6) return 1
  else if (id <= 12) return 2
  else if (id <= 16) return 3
}

const fromGradeIdToGrade = (id) => {
  if (id === null) id = 1
  if (id <= 3) return id - 1
  else if (id <= 6) return id - 4
  else if (id <= 12) return id - 7
  else if (id <= 16) return id - 13
}

const fromGradeAndEduToId = (edu, grade) => {
  console.log(edu, grade)
  switch (edu) {
    case 0 : return grade + 1
    case 1 : return grade + 4
    case 2 : return grade + 7
    case 3 : return grade + 13
  }
}

const fromCampusToId = (campus) => {
  return {
    紫金港校区: 1,
    玉泉校区: 2,
    西溪校区: 3,
    华家池校区: 4,
    之江校区: 6,
    舟山校区: 7
  }[campus]
}

const actions = {
  async getInfo(context, user) {
    console.log(user)

    context.commit('setUserInfo', {
      name: user.name,
      sex: user.gender === 'M',
      auth: user.certificated,
      grade: fromGradeIdToGrade(user.grade.id),
      edu: fromGradeIdToEdu(user.grade.id),
      rate: 5, // TODO: Fix
      salary: user.salary,
      highestSalary: 5000, // TODO: Fix
      teach: user.subjectTable,
      availableTime: user.availableTime || [[1, 1, 1], [1, 1, 1], [1, 1, 1], [1, 1, 1], [1, 1, 1], [1, 1, 1], [1, 1, 1]],
      tags: user.tags || [],
      selfIntro: user.selfIntroduction,
      role: user.studentId === undefined,
      createdAt: new Date(user.joinedAt),
      campus: user.campus.name || '紫金港校区'
    })
  },
  async submitToBackend(context) {
    let res = await fetch('https://api.houaa.xyz/person/me/edit/', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({
        salary: context.state.user.salary,
        campusId: fromCampusToId(context.state.user.campus),
        gradeId: fromGradeAndEduToId(context.state.user.edu, context.state.user.grade),
        availableTime: context.state.user.availableTime,
        subjectTable: context.state.user.teach
      })
    }).then(raw => raw.json())
    if (res.status === 'error') throw new Error(res.payload)

    res = await fetch('https://api.houaa.xyz/person/me/editRequest/', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({
        tags: context.state.user.tags,
        selfIntroduction: context.state.user.selfIntro
      })
    }).then(raw => raw.json())
    if (res.status === 'error') throw new Error(res.payload)
    // const AVuser = AV.User.current()
    // if (context.state.user['role']) {
    //   const teacherQuery = new AV.Query('TeacherList')
    //   const result = await teacherQuery.equalTo('id', AVuser.id).find()
    //   if (result.length === 0) {
    //     const TeacherList = AV.Object.extend('TeacherList')
    //     const newTeacher = new TeacherList()
    //     const newInfo = {
    //       ...context.state.user,
    //       id: AVuser.id
    //     }
    //     delete newInfo.createdAt
    //     await newTeacher.save(newInfo)
    //   } else {
    //     const TeacherUser = result[0]
    //     const newUser = {
    //       name: context.state.user.name,
    //       grade: parseInt(context.state.user.grade),
    //       edu: context.state.user.edu,
    //       salary: context.state.user.salary,
    //       teach: context.state.user.teach,
    //       availableTime: context.state.user.availableTime,
    //       tags: context.state.user.tags,
    //       selfIntro: context.state.user.selfIntro,
    //       campus: context.state.user.campus
    //     }
    //     for (const key in newUser) {
    //       if (key !== 'createdAt') {
    //         TeacherUser.set(key, newUser[key])
    //       }
    //     }
    //     await TeacherUser.save()
    //   }
    // } else if (context.state.user['role'] === false) {
    //   const studentQuery = new AV.Query('StudentList')
    //   const result = await studentQuery.equalTo('id', AVuser.id).find()
    //   if (result.length === 0) {
    //     const StudentList = AV.Object.extend('StudentList')
    //     const newStudent = new StudentList()
    //     await newStudent.save({
    //       ...context.state.user,
    //       id: AVuser.id
    //     })
    //   } else {
    //     const StudentUser = result[0]
    //     const newUser = {
    //       name: context.state.user.name,
    //       grade: parseInt(context.state.user.grade),
    //       edu: context.state.user.edu,
    //       salary: context.state.user.salary,
    //       teach: context.state.user.teach,
    //       availableTime: context.state.user.availableTime,
    //       tags: context.state.user.tags,
    //       selfIntro: context.state.user.selfIntro,
    //       campus: context.state.user.campus
    //     }
    //     for (const key in newUser) {
    //       StudentUser.set(key, newUser[key])
    //     }
    //     await StudentUser.save()
    //   }
    // }

    // const newUser = {
    //   name: context.state.user.name,
    //   grade: parseInt(context.state.user.grade),
    //   edu: context.state.user.edu,
    //   salary: context.state.user.salary,
    //   teach: context.state.user.teach,
    //   availableTime: context.state.user.availableTime,
    //   tags: context.state.user.tags,
    //   selfIntro: context.state.user.selfIntro,
    //   campus: context.state.user.campus
    // }
    // for (const key in newUser) {
    //   AVuser.set(key, newUser[key])
    // }
    // await AVuser.save()
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
  createTime: state => state.createdAt,
  orderedOne: state => state.orderedOne
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
