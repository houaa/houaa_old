<template>
  <div id="scrollable">
    <TeachList :all-users="realUser"></TeachList>
  </div>
</template>

<script>
// import AV from 'leancloud-storage'
import TeachList from './TeachList'
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'teacher',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      page: 0,
      end: false,
      allUsers: []
    }
  },
  computed: {
    ...mapGetters([
      'allTeachers',
      'allStudents'
    ]),
    realUser: function () {
      if (this.$route.path === '/student') {
        if (this.allStudents.length > 0) {
          return this.allStudents
        } else {
          this.getStudents()
          return this.allStudents
        }
      } else if (this.$route.path === '/teacher') {
        if (this.allTeachers.length > 0) {
          return this.allTeachers
        } else {
          this.getTeachers()
          return this.allTeachers
        }
      }
    }
  },
  components: {
    TeachList
  },
  methods: {
    ...mapMutations([
      'setAllTeachers',
      'setAllStudents'
    ]),
    getTeachers: async function () {
      let self = this
      let allUsers = []
      let end = false
      let page = 0
      for (let i = 0; i <= 10; i++) {
        if (!end) {
          const raw = await fetch(`https://api.houaa.xyz/person/teacher/list/${++page}`, {
            method: 'GET'
          })
          const json = await raw.json()
          if (json.status === 'error') {
            self.$message(json.payload)
          } else if (json.status === 'success') {
            if (allUsers.length > 0 && json.payload.items[json.payload.items.length - 1].teacherId === allUsers[allUsers.length - 1].teacherId) {
              end = true
            } else {
              allUsers = allUsers.concat(json.payload.items)
            }
          }
        } else {
          break
        }
      }
      self.allUsers = allUsers
      self.setAllTeachers(allUsers)
      // let query = new AV.Query('TeacherList')
      // query.find().then((result) => {
      //   // console.log('asdf', result)
      //   self.allUsers = result
      //   self.setAllTeachers(result)
      //   // console.log(result)
      //   // console.log(self.allUsers)
      // }, error => {
      //   console.log(error)
      // })
    },
    getStudents: async function () {
      let self = this
      let allUsers = []
      let end = false
      let page = 0
      for (let i = 0; i <= 10; i++) {
        if (!end) {
          const raw = await fetch(`https://api.houaa.xyz/person/student/list/${++page}`, {
            method: 'GET'
          })
          const json = await raw.json()
          if (json.status === 'error') {
            self.$message(json.payload)
          } else if (json.status === 'success') {
            if (allUsers.length > 0 && json.payload.items[json.payload.items.length - 1].studentId === allUsers[allUsers.length - 1].studentId) {
              end = true
            } else {
              allUsers = allUsers.concat(json.payload.items)
            }
          }
        } else {
          break
        }
      }
      self.allUsers = allUsers
      self.setAllStudents(allUsers)
      // let self = this
      // let query = new AV.Query('StudentList')
      // query.find().then((result) => {
      //   // console.log('asdf', result)
      //   self.allUsers = result
      //   self.setAllStudents(result)
      //   // console.log(result)
      //   // console.log(self.allUsers)
      // }, error => {
      //   console.log(error)
      // })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
