<template>
  <div class="main-contianer">
    <!--<div class="welcome-msg">
      <span v-if="!loggedIn">欢迎来到猴啊家教，您尚未<span class="login" @click="toLoginPage" >登录！</span>
      <span class="login" style="cursor: pointer" @click="toSignupPage">注册</span>
      <span class="login" @click="userLogin">临时登录</span>
      </span>
      <span v-else>欢迎来到猴啊家教，{{userInfo.username}}！ <span class="login" style="cursor: pointer" @click="userLogout">注销</span></span>
    </div>-->
  
    <div style="width:95%;margin:1rem auto 0.5rem auto;">
      <el-input placeholder="猴啊家教" size="large" icon="search">
      </el-input>
    </div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="教师" name="teach">
        <router-view></router-view>
      </el-tab-pane>
      <el-tab-pane label="学生" name="teacher">
        <router-view></router-view>
      </el-tab-pane>
      <el-tab-pane label="订单" name="reserve">
        <router-view></router-view>
      </el-tab-pane>
      <el-tab-pane label="个人" name="self">
        <router-view></router-view>
      </el-tab-pane>
    </el-tabs>
  
    <transition name="fade">
      <div v-if="loginModal" v-on:click="closeModal" class="float-container" :body-style="{padding: '0px'}">
        <div class="float-content">
          <div class="float-text">
            如需查看详细信息或进行筛选搜索，请您
          </div>
          <button @click="toLoginPage" class="btn  gray" type="button">
            <span>登录</span>
          </button>
          <button @click="toSignupPage" class="btn" type="button">
            <span>注册</span>
          </button>
        </div>
      </div>
    </transition>
  
    <div v-show="searchModal" v-on:click="closeModal" class="float-container">
      <div class="search-content">
        <el-row :gutter="10" class="search-margin">
          <el-col :span="8" class="who-teach">
            谁在教
          </el-col>
          <el-col :span="16">
            <el-input icon="search" placeholder="随便输入什么"></el-input>
          </el-col>
        </el-row>
        <el-row :gutter="10" class="search-margin">
          <el-col :span="8" class="search-txt">
            性别：
          </el-col>
          <el-col :span="16">
            <span v-on:click="clickTag(otherTag[0])">
              <el-tag type="gray" v-bind:color="otherTag[0].value" class="tag-font">
                {{otherTag[0].key}}
              </el-tag>
            </span>
            <span v-on:click="clickTag(otherTag[1])">
              <el-tag type="gray" v-bind:color="otherTag[1].value" class="tag-font">
                {{otherTag[1].key}}
              </el-tag>
            </span>
          </el-col>
        </el-row>
  
        <el-row :gutter="10" class="search-margin">
          <el-col :span="24" class="search-txt">
            志愿科目：
          </el-col>
        </el-row>
  
        <el-row :gutter="10" class="search-margin">
          <el-col v-for="(sub,index) in subject" :span="8" :key="index" class="search-txt">
            <span v-on:click="clickTag(sub)">
              <el-tag type="gray" v-bind:color="sub.value" class="tag-font">
                {{sub.key}}
              </el-tag>
            </span>
          </el-col>
        </el-row>
  
        <el-row :gutter="10" class="search-margin">
          <el-col :span="24" class="search-txt">
            空余时间：
          </el-col>
        </el-row>
  
        <el-row :gutter="10" class="search-margin">
          <el-time-picker is-range v-model="avaTime" placeholder="随便什么时候">
          </el-time-picker>
        </el-row>
  
        <el-row :gutter="10" class="search-margin">
          <el-col :span="24" class="search-txt">
            预期价位(每小时)：
          </el-col>
        </el-row>
  
        <el-row :gutter="10" class="search-margin">
          <el-col :span="8" class="search-txt">
            <span v-on:click="clickTag(otherTag[2])">
              <el-tag type="gray" v-bind:color="otherTag[2].value" class="tag-font">
                {{otherTag[2].key}}
              </el-tag>
            </span>
          </el-col>
          <el-col :span="8" class="search-txt">
            <span v-on:click="clickTag(otherTag[3])">
              <el-tag type="gray" v-bind:color="otherTag[3].value" class="tag-font">
                {{otherTag[3].key}}
              </el-tag>
            </span>
          </el-col>
        </el-row>
  
        <el-row :gutter="10" class="search-margin">
          <el-col :span="24" class="search-txt">
            地点偏好：
          </el-col>
        </el-row>
  
        <el-row :gutter="10" class="search-margin">
          <el-col :span="8" class="search-txt">
            <span v-on:click="clickTag(otherTag[4])">
              <el-tag type="gray" v-bind:color="otherTag[4].value" class="tag-font">
                {{otherTag[4].key}}
              </el-tag>
            </span>
          </el-col>
          <el-col :span="8" class="search-txt">
            <span v-on:click="clickTag(otherTag[5])">
              <el-tag type="gray" v-bind:color="otherTag[5].value" class="tag-font">
                {{otherTag[5].key}}
              </el-tag>
            </span>
          </el-col>
          <el-col :span="8" class="search-txt">
            <span v-on:click="clickTag(otherTag[6])">
              <el-tag type="gray" v-bind:color="otherTag[6].value" class="tag-font">
                {{otherTag[6].key}}
              </el-tag>
            </span>
          </el-col>
        </el-row>
      </div>
    </div>
  
    <transition name="fade">
  
    </transition>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'home',
  computed: {
    ...mapGetters([
      'loggedIn',
      'loginModal',
      'userInfo'
    ]),
    teachOrFalse: function () {
      if (this.$route.path.startsWith('/teach')) {
        return true
      } else {
        return false
      }
    }
  },
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      currentDate: new Date(),
      user_name: 'HLH',
      searchModal: false,
      subject: [
        { 'key': '小学', 'value': '#dddddd' },
        { 'key': '初中', 'value': '#dddddd' },
        { 'key': '高中', 'value': '#dddddd' },
        { 'key': '语文', 'value': '#dddddd' },
        { 'key': '数学', 'value': '#dddddd' },
        { 'key': '英语', 'value': '#dddddd' },
        { 'key': '物理', 'value': '#dddddd' },
        { 'key': '化学', 'value': '#dddddd' },
        { 'key': '生物', 'value': '#dddddd' },
        { 'key': '地理', 'value': '#dddddd' },
        { 'key': '政治', 'value': '#dddddd' },
        { 'key': '历史', 'value': '#dddddd' }],
      otherTag: [
        { 'key': '男', 'value': '#dddddd' },
        { 'key': '女', 'value': '#dddddd' },
        { 'key': '0-100', 'value': '#dddddd' },
        { 'key': '100-200', 'value': '#dddddd' },
        { 'key': '紫金港', 'value': '#dddddd' },
        { 'key': '西溪', 'value': '#dddddd' },
        { 'key': '玉泉', 'value': '#dddddd' }
      ],
      activeName: 'teach',
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
    handleClick: function (tab, event) {
      this.$router.push(tab.name)
    },
    toDate: function () {
      this.$router.push('/reserve')
    },
    toTeacherDate: function () {
      this.$router.push('/tereserve')
    },
    search: function (event) {
      if (this.loggedIn === false) {
        this.showLoginModal()
      } else {
        this.searchModal = true
      }
    },
    clickTag: function (item) {
      if (item.value !== '#dddddd') {
        item.value = '#dddddd'
      } else {
        item.value = '#21B046'
      }
    },
    toHome: function () {
      this.$router.push('/')
    },
    toLoginPage: function () {
      this.$router.push('/login')
    },
    toLearn: function () {
      this.$router.push('/learn')
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

.el-tabs__nav {
  width: 100%;
  display: flex;
}

.el-tabs__item {
  flex-grow: 1;
  text-align: center;
}

.el-tabs__active-bar {
  width: 50%;
  background-color: #00AF63;
  height: 4px;
}

.el-tabs__header {
  margin-bottom: 0px;
}

.el-tabs__item.is-active {
  color: #00AF63;
}
/*.el-input__inner {
  background: url(../assets/houaa-r.png) no-repeat scroll;
  padding-left: 30px;
}*/
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


.el-tag {
  cursor: pointer;
}

.search-margin {
  margin-bottom: 10px;
}

.search-txt {
  font-size: 16px;
}

.tag-font {
  font-size: 14px;
  margin-bottom: 10px;
}

.who-teach {
  font-size: 22px;
  color: #21B046;
  margin-bottom: 15px;
}

.search-content {
  position: fixed;
  z-index: 1;
  padding: 5%;
  width: 60%;
  height: 100%;
  right: 0;
  top: 0;
  background-color: #fefefe;
  animation-name: fromLef;
  animation-duration: 0.4s;
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
  left: 0;
  top: 0px;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.6);
}

.float-content {
  position: fixed;
  z-index: 1;
  /*padding-top: 60px;*/
  /*padding-bottom: 30px;*/
  padding: 3.5rem 1rem 2rem 1rem;
  left: 50%;
  /*right: 0;*/
  transform: translateX(-50%);
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
  padding-top: 0.3rem;
  overflow: scroll;
  height: 100%;
}

::-webkit-scrollbar {
  display: none;
}

.welcome-msg {
  color: #555;
  font-size: 0.8rem;
  margin-bottom: 0.3rem;
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
  /*color: #e0e0e0;*/
  color: black;
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
  background-color: #27ae60;
}

.btn>* {
  position: relative;
}

.btn span {
  display: block;
  padding: 12px 24px;
}

.btn.gray {
  background-color: #747474;
}

.btn .gray:hover,
.btn.gray:hover {
  background-color: #606060
}
</style>
