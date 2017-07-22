<template>
  <div>
    <TeachList :all-users="realUser"></TeachList>
  </div>
</template>

<script>
import AV from 'leancloud-storage'
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
      return this.$route.path === '/student' ? this.allStudents : this.allTeachers
    }
  },
  components: {
    TeachList
  },
  created: function () {
    console.log(this.$route.path)
    if (this.$route.path === '/student') {
      this.getStudents()
      this.allUsers = this.allTeachers
    } else if (this.$route.path === '/teacher') {
      this.getTeachers()
      this.allUsers = this.allTeachers
    }
  },
  methods: {
    ...mapMutations([
      'setAllTeachers',
      'setAllStudents'
    ]),
    getTeachers: function () {
      let self = this
      let query = new AV.Query('TeacherList')
      query.find().then((result) => {
        // console.log('asdf', result)
        self.allUsers = result
        self.setAllTeachers(result)
        // console.log(result)
        // console.log(self.allUsers)
      }, error => {
        console.log(error)
      })
    },
    getStudents: function () {
      let self = this
      let query = new AV.Query('StudentList')
      query.find().then((result) => {
        // console.log('asdf', result)
        self.allUsers = result
        self.setAllStudents(result)
        // console.log(result)
        // console.log(self.allUsers)
      }, error => {
        console.log(error)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
