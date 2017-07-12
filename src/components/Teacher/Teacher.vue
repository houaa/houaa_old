<template>
  <div>
    <TeachList :all-users="allUsers"></TeachList>
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
      'allTeachers'
    ])
  },
  components: {
    TeachList
  },
  created: function () {
    if (!this.allTeachers) {
      this.getTeachers()
    } else {
      this.allUsers = this.allTeachers
    }
  },
  methods: {
    ...mapMutations([
      'setAllTeachers'
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
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
