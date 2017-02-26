<template>
  <div class="teach-container" >
    <el-row  :gutter="10">
      <el-col class="main-card" :xs="12" :sm="8" :lg="6" v-for="(user,index) in allUsers">
        <el-card :body-style="{padding: '0px'}">
          <div class="img-figure">
            <img src="../assets/logo.png" class="image">
            <figcaption class="img-caption">
              <el-rate v-model="user.ratings" disabled></el-rate>
            </figcaption>
          </div>
          <div style="padding: 14px;">
            <span style="font-size: 18px">{{user.name}}</span>
            <div style="font-size: 14px; color: #555">
              <div>{{ user.basicInfo}}</div>
              <div>{{user.subject}}</div>
              <el-button v-on:click="showDetail" type="text" class="button">了解详情</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import axios from 'axios'
export default {
  name: 'hello',
  computed: {
    ...mapGetters([
      'loggedIn',
      'loginModal',
      'allTeachers',
      'teachURL'
    ])
    // allUsers: function () {
    //   let names = ['wang', 'boxin', 'hao', 'xiangpeng', 'xu', 'guorui', 'qiu', 'shichao']
    //   let allUsers = []
    //   let subjects = ['数学', '物理', '英语', '化学', '生物']
    //   for (let i = 0; i < 10; i++) {
    //     allUsers.push({
    //       name: names[Math.floor(Math.random() * 8)],
    //       rank: Math.round(Math.random() * 5),
    //       avatar: '../assets/logo.png',
    //       basicInfo: '浙江大学XX学院',
    //       subject: subjects[Math.floor(Math.random() * 5)]
    //     })
    //   }
    //   return allUsers
    // }
  },
  filters: {
    toInt: function (value) {
      return parseInt(value)
    }
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      allUsers: {}
    }
  },
  created: function () {
    let self = this
    self.fetchTeachers()
  },
  methods: {
    ...mapMutations([
      'showLoginModal',
      'hideLoginModal'
    ]),
    showDetail: function (event) {
      if (!this.loggedIn) {
        this.showLoginModal()
      } else {
        this.$router.push('teacher')
      }
    },
    fetchTeachers: function () {
      let self = this
      axios.get(self.teachURL).then(
        response => {
          console.log(response.data)
          if (response.data.msg === 'OK') {
            this.$message('成功获取数据')
            self.allUsers = response.data.teachers.map(
              item => {
                let newItem = item
                newItem.ratings = parseInt(newItem.ratings)
                return newItem
              }
            )
          }
        }
      )
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.img-figure{
  display: block;
  position: relative;
  overflow: hidden;
}
.img-caption{
  position: absolute;
  background-color: rgba(0,0,0,0.75);
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
.main-card:hover .img-caption{
  opacity: 1;
  /*bottom: 0;*/
}
.main-card{
  /*margin-top: 20px;*/
  margin-bottom: 20px;
}
.time{
  font-size: 13px;
  color: #999;
}
.image{
  width: 100%;
  display: block;
}

</style>
