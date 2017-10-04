<template>
  <div>
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
      allUsers: {}
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
  created: function () {
  },
  methods: {
    ...mapMutations([
      'setAllTeachers',
      'setAllStudents'
    ]),
    getTeachers: function () {
      let self = this
      fetch('https://api.houaa.xyz/person/teacher/list/6', {
        method: 'GET'
      }).then(raw => raw.json())
      .then(json => {
        if (json.status === 'error') {
          self.$message(json.payload)
        } else if (json.status === 'success') {
          self.allUsers = json.payload.items
          self.setAllTeachers(json.payload.items)
        }
      }).catch(err => {
        console.log(err)
        self.$message('发生错误')
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
    getStudents: function () {
      let self = this
      fetch('https://api.houaa.xyz/person/student/list/6', {
        method: 'GET'
      }).then(raw => raw.json())
      .then(json => {
        if (json.status === 'error') {
          self.$message(json.payload)
        } else if (json.status === 'success') {
          self.allUsers = json.payload.items
          self.setAllStudents(json.payload.items)
        }
      }).catch(err => {
        console.log(err)
        self.$message('发生错误')
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
