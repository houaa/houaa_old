<template>
  <div class="main-contianer">

    <el-row style="margin-top:50px; margin-bottom: 25px;">
      <el-col :span="8" class="icons">
            <i v-on:click="search" class="el-icon-search one-icon"></i>
      </el-col>
    </el-row>

    <div v-show="searchModal" v-on:click="closeModal" class="float-container">
      <div class="search-content">
        <div class="search-section">
        <el-row class="search-margin">
            <el-input icon="search" placeholder="猴啊家教"></el-input>
        </el-row>
        </div>

        <div class="search-section">
          <el-row>
              <el-row class="search-title"># 阶段</el-row>
              <el-row :gutter="20" class="search-margin">
                <el-col :span="6" v-for="(sub,index) in section" class="search-txt">
                  <span v-on:click="clickTag(sub)">
                          <el-tag class="tag-font" >
                            {{sub.key}}
                          </el-tag>
                        </span>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </div>

        <div class="search-section">
          <el-row>
            <el-col :span="20">
              <el-row class="search-title"># 课程</el-row>
              <el-row :gutter="20" class="search-margin">
                <el-col :span="7" v-for="(sub,index) in course" class="search-txt">
                  <span v-on:click="clickTag(sub)">
                          <el-tag class="tag-font course-tag" >
                            {{sub.key}}
                          </el-tag>
                        </span>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </div>

        <div class="search-section">
          <el-row class="search-title"># 校区</el-row>
          <el-row :gutter="20" class="search-margin">
            <el-col :span="6" v-for="(sub,index) in campus" class="search-txt">
              <span v-on:click="clickTag(sub)">
                      <el-tag class="tag-font" >
                        {{sub.key}}
                      </el-tag>
                    </span>
            </el-col>
          </el-row>
        </div>

        <div class="search-section">
          <el-row class="search-title"># 价格</el-row>
          <el-row class="search-margin">
            <el-col :span="4"class="search-pay">
              <el-input class="search-input"  id = "selectme" size="mini" placeholder="min"></el-input>
            </el-col>
            <el-col :span="2" style="color:#595959;text-align:center">一</el-col>
            <el-col :span="4">
              <el-input class="search-input" id = "selectme2" size="mini" placeholder="max"></el-input>
            </el-col>
          </el-row>
        </div>

        <div class="search-section" style="margin-top:30px;">
          <el-row class="search-title">高级选项 -></el-row>
        </div>
      </div>
    </div>
  
    <transition name="fade">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'hello',
  computed: {
    ...mapGetters([
      'loggedIn',
      'loginModal',
      'userInfo'
    ])
  },
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      currentDate: new Date(),
      user_name: 'HLH',
      searchModal: false,
      course: [
        { 'key': ' 语 ' },
        { 'key': ' 数 ' },
        { 'key': ' 英 ' },
        { 'key': ' 物 ' },
        { 'key': ' 化 ' },
        { 'key': ' 生 ' },
        { 'key': ' 政 ' },
        { 'key': ' 史 ' },
        { 'key': ' 地 ' }
      ],
      section: [
        { 'key': '小学' },
        { 'key': '初中' },
        { 'key': '高中' }
      ],
      campus: [
        { 'key': '紫金港' },
        { 'key': '玉泉' },
        { 'key': '西溪' }
      ],
      avaTime: [new Date(), new Date().setHours(new Date().getHours + 4)]
    }
  },
  methods: {
    ...mapMutations([
      'userLogin',
      'userLogout',
      'hideLoginModal',
      'showLoginModal'
    ]),
    closeModal: function (event) {
      if (event.target.className === 'float-container') {
        this.hideLoginModal()
        this.searchModal = false
      }
    },
    toDate: function () {
      this.$router.push('/reserve')
    },
    toTeacherDate: function () {
      this.$router.push('/tereserve')
    },
    search: function (event) {
      this.searchModal = true
    },
    clickTag: function (item) {
      if (item.value !== '#dddddd') {
        item.value = '#dddddd'
      } else {
        item.value = '#389F74'
      }
    },
    toHome: function () {
      this.$router.push('/')
    },
    toLoginPage: function () {
      this.$router.push('/login')
    },
    toSignupPage: function () {
      this.$router.push('/signup')
    }
  }
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity .3s
}

.fade-enter,
.fade-leave-to {
  opacity: 0
}

.search-input input{
  text-align: cemter;
  height: 25px;
  background-color: #343434;
  border: #5E5E5F solid 1px;
  color:#1B8F2A;
  /*border:20px;*/
}

</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-tag {
  cursor: pointer;
}

.search-margin {
  margin-bottom: 10px;
}

.search-section{
  margin: 15px 20px;
  /*border-bottom: #aaa solid 1px;*/
}

.search-txt {
  color: white;
  font-weight: 200;
  font-size: 16px;

}

.tag-font {
  color: #17A028;
  font-size: 14px;
  margin-bottom: 10px;
  background-color: #343434;
  border: #5E5E5F solid 1px;
  width: 55px;
  height: 25px; /*MAYBE BAD*/
  text-align: center;
}

.tag-font:focus,
.tag-font:hover{
  background-color: #4DAC78;
  border: #4DAC78 solid 1px;
  font-weight: 400;
}

.who-teach {
  font-size: 22px;
  color: #389F74;
  margin-bottom: 15px;
}

.search-content {
  /*position: fixed;*/
  z-index: 1;
  width: 100%;
  height: 100%;
  background-color: #262626;
  animation-name: fromLef;
  animation-duration: 0.4s;
}

.search-title{
  color: white;
  margin-bottom: 20px;
  font-size: 20px;
  font-weight: 400;

}

@keyframes fromLef {
  from {
    right: -100%;
  }
  to {
    right: 0;
  }
}

.float-container {
  position: fixed;
  z-index: 2;
  left: 0%;
  top: 0px;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: #262626;
}

.float-content {
  position: fixed;
  z-index: 1;
  padding-top: 60px;
  padding-bottom: 30px;
  left: 15%;
  top: 130px;
  width: 70%;
  height: 40%;
  overflow: auto;
  background-color: #fefefe;
}

.float-text {
  font-size: 20px;
  text-align: center;
  color: #444444;
  padding: 2.5%;
  margin-bottom: 10%;
}

.login {
  color: orange;
}

.main-contianer {
  padding: 20px;
  padding-left: 5%;
  padding-right: 5%;
  overflow: scroll;
  height: 100%;
}

::-webkit-scrollbar {
  display: none;
}

.welcome-msg {
  color: #fefefe;
  font-size: 14px;
  margin-bottom: 25px;
}

.title {
  /*color: #f0f0f0;*/
  color: white;
  font-size: 25px;
  font-weight: bold;
  letter-spacing: 0.5px;
  border: 1px #000000;
  cursor: pointer;
}

.title2 {
  /*color: #f0f0f0;*/
  color: white;
  font-size: 16px;
  letter-spacing: 0.5px;
  border: 1px #000000;
  cursor: pointer;
}

.title.small {
  font-size: 16px;
  font-weight: normal;
  color: #B4EDDB;
}

.icons {
  font-size: 16px;
  font-weight: normal;

  color: white;
  position: absolute;
  float: left;
  bottom: 5px;
  right: 0;
  cursor: pointer;
}

.one-icon {
  float: right;
  margin-left: 5%;
}

.btn {
  position: relative;
  display: block;
  margin: 0px auto 10px;
  padding: 0;
  overflow: hidden;
  border-width: 0;
  outline: none;
  border-radius: 2px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.6);
  background-color: #2ecc71;
  color: #ecf0f1;
  transition: background-color .3s;
  width: 95%;
}

.btn:hover,
.btn:focus {
  /*background-color: #27ae60;
  color:white;*/
}

.btn>* {
  position: relative;
}

.btn span {
  display: block;
  padding: 12px 24px;
}
</style>
