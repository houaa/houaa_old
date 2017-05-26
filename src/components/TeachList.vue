<template>
  <div class="teach-container">
  
    <el-row :gutter="12">
      <el-col class="main-card" :xs="24" :sm="8" :lg="6" :key="index" v-for="(user,index) in allUsers" v-on:click.native="showDetail(index, $event)">
        <div style="width:25%;display:flex;justify-content: center;align-items: center;">
          <img width="60%;" style="" src="../assets/houaa-r.png">
        </div>
        <div style="flex-grow:1;margin: auto 0.5rem auto 0.5rem;padding: 0.6rem 1.5rem 0.6rem 0rem;border-bottom:1px solid #eee;">
          <div style="padding:0.5rem 0 0.5rem 0;">
            <span style="font-size: 1.3rem;">{{user.name}}</span>
            <span style="color:#555;"> /{{user.school}}</span>
          </div>
          <div style="font-size: 14px; color: #555">
            <div>本科：{{user.major}}</div>
            <div>
              <el-tag type="success">{{user.area}}</el-tag>
              <el-tag type="success">信息技术</el-tag> - 加入时间：{{user.join_time}}</div>
            <!--<el-button v-on:click="showDetail(index, $event)" type="text" class="button">了解详情</el-button>-->
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import axios from 'axios'
export default {
  name: 'teach',
  computed: {
    ...mapGetters([
      'loggedIn',
      'loginModal',
      'allTeachers',
      'teachURL'
    ])
  },
  filters: {
    toInt: function (value) {
      return parseInt(value)
    }
  },
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      allUsers: {}
    }
  },
  created: function () {
    let self = this
    self.fetchTeachers()
    // var TestObject = AV.Object.extend('TestObject')
    // var testObject = new TestObject()
    // testObject.save({
    //   words: 'Hello World!'
    // }).then(function (object) {
    //   console.log('LeanCloud Rocks!')
    // })
  },
  methods: {
    ...mapMutations([
      'showLoginModal',
      'hideLoginModal',
      'setCurrentTeacher',
      'setAllTeachers'
    ]),
    showDetail: function (index, event) {
      if (!this.loggedIn) {
        this.showLoginModal()
      } else {
        this.setCurrentTeacher(this.allUsers[index])
        this.$router.push('teacher')
      }
    },
    fetchTeachers: function () {
      let self = this
      if (!self.allTeachers) {
        axios.get(self.teachURL).then(
          response => {
            console.log(response.data)
            if (response.data.msg === 'OK') {
              this.$message({
                message: '成功获取数据',
                showClose: true,
                duration: 1000
              })
              self.allUsers = response.data.teachers.reverse().map(
                item => {
                  let newItem = item
                  newItem.ratings = parseInt(newItem.ratings)
                  return newItem
                }
              )
              self.setAllTeachers(self.allUsers)
            }
          }
        )
      } else {
        self.allUsers = self.allTeachers
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.img-figure {
  display: block;
  position: relative;
  overflow: hidden;
}


.img-caption {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.75);
  color: white;
  width: 100%;
  padding: 3px 0 3px 0;
  /*padding: 10px 20px;*/
  text-align: center;
  /*width: 100%;*/
  /*opacity: 0;*/
  /*bottom: -30%;*/
  bottom: 0;
  opacity: 0.4;
  left: 0;
  transition: all 0.6s ease;
}

.main-card:hover .img-caption {
  opacity: 1;
  /*bottom: 0;*/
}

.main-card {
  /*margin-top: 20px;*/
  margin-bottom: 0.5rem;
  display: flex;
}

.time {
  font-size: 13px;
  color: #999;
}

.image {
  width: 100%;
  display: block;
}
</style>
