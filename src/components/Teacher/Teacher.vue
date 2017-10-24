<template>
  <div id="scrollable">
    <TeachList :page-number="pageNumber" :all-users="realUser"></TeachList>
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
      allUsers: [],
      pageNumber: 1
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
    getTeachers: function () {
      const self = this
      fetch(`https://api.houaa.xyz/person/teacher/list`, {
        method: 'GET'
      }).then(raw => raw.json())
      .then(json => {
        if (json.status === 'error') {
          self.$message(json.payload)
        } else if (json.status === 'success') {
          const allUsers = json.payload
          self.allUsers = allUsers
          self.setAllTeachers(allUsers)
        }
      })
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
      const self = this
      fetch(`https://api.houaa.xyz/person/student/list/1`, {
        method: 'GET'
      }).then(raw => raw.json())
      .then(json => {
        if (json.status === 'error') {
          self.$message(json.payload)
        } else if (json.status === 'success') {
          const allUsers = json.payload.items
          self.allUsers = allUsers
          self.setAllStudents(allUsers)
        }
      })
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
