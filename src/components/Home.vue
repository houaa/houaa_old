<template>
  <div class="main-contianer">
    <div style="width:90%;margin:1rem auto 0.5rem auto;">
      <el-input @click.native="toSearch" placeholder="猴啊家教" size="large" icon="search">
      </el-input>
    </div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane :id="'pane'+index" :label="item.label" :name="item.name" v-for="(item,index) in tabs" :key="index">
        <router-view></router-view>
      </el-tab-pane>
    </el-tabs>

  </div>
</template>

<script>
import Hammer from 'hammerjs'
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
    },
    activeName: function () {
      if (this.$route.path === '/detail') {
        return 'teacher'
      }
      return this.$route.path.substring(1)
    }
  },
  created: function () {
    // if (window.innerWidth > 500) {
    //   window.location.href = 'https://error.houaa.xyz/tomobile.html?source=' + window.location.href
    //   // this.$message({ message: '电脑版还在紧张适配中噢，敬请期待！', type: 'warning' })
    // }
  },
  mounted: function () {
    let self = this

    // Swipe Action
    for (let index = 0; index < 4; index++) {
      let hammertime = new Hammer(document.getElementById('pane' + index))
      hammertime.on('swipeleft', function (ev) {
        self.onSwipeLeft(index)
      })
      hammertime.on('swiperight', function () {
        self.onSwipeRight(index)
      })
    }
  },
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      currentDate: new Date(),
      user_name: 'HLH',
      searchModal: false,
      avaTime: [new Date(), new Date().setHours(new Date().getHours + 4)],
      tabs: [
        { label: '教师', name: 'teacher' },
        { label: '学生', name: 'student' },
        { label: '订单', name: 'reserve' },
        { label: '我', name: 'self' }
      ]
    }
  },
  methods: {
    ...mapMutations([
      'userLogin',
      'userLogout',
      'hideLoginModal',
      'showLoginModal'
    ]),
    testPan: function (e) {
      document.getElementsByClassName('el-tab-pane').scrollTop += 10
    },
    onSwipeLeft: function (index) {
      if (index + 1 < this.tabs.length) {
        this.$router.push(this.tabs[index + 1].name)
      }
    },
    onSwipeRight: function (index) {
      if (index > 0) {
        this.$router.push(this.tabs[index - 1].name)
      }
    },
    toSearch: function () {
      this.$router.push('/search')
    },
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
      if (!this.userInfo) {
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

.el-tabs__item.is-active {
  color: #00AF63;
}

.el-tabs {
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.el-tabs__header {
  margin-bottom: 0;
}

.el-tabs__content {
  overflow: scroll;
}

.el-tabs__content::-webkit-scrollbar {
  display: none;
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




.login {
  color: orange;
}

.main-contianer {
  /* padding-top: 0.3rem; */
  /* overflow: scroll; */
  height: 100%;
  display: flex;
  flex-direction: column;
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
