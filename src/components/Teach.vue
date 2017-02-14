<template>
  <div class="teach-container">
    <el-row  :gutter="10">
      <el-col class="main-card" :xs="12" :sm="8" :lg="6" v-for="(user,index) in allUsers">
        <el-card :body-style="{padding: '0px'}">
          <div class="img-figure">
            <img src="../assets/logo.png" class="image">
            <figcaption class="img-caption">{{user.rank}}/5</figcaption>
          </div>
          <div style="padding: 14px;">
            <span>{{user.name}}</span>
            <div class="bottom">
              <time class="time">{{ currentDate }}</time>
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
export default {
  name: 'hello',
  computed: {
    ...mapGetters([
      'loggedIn',
      'loginModal'
    ]),
    allUsers: function () {
      let names = ['wang', 'boxin', 'hao', 'xiangpeng', 'xu', 'guorui', 'qiu', 'shichao']
      let allUsers = []
      for (let i = 0; i < 10; i++) {
        allUsers.push({
          name: names[Math.floor(Math.random() * 8)],
          rank: Math.round(Math.random() * 5),
          avatar: '../assets/logo.png'
        })
      }
      return allUsers
    }
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      currentDate: new Date()
    }
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
  padding: 7px 0 7px 0;
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
