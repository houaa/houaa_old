<template>
  <div class="main-contianer">
    <div v-show="searchModal" v-on:click="closeModal" class="float-container">
      <div class="search-content">
        <div class="search-section">
          <el-row class="search-margin">
            <el-input :autofocus="true" id="searchInput" :on-icon-click="search" v-model="searchValue" icon="search" placeholder="猴啊家教" size="large">
              <el-button slot="prepend" icon="arrow-left" @click="toBack"></el-button>
            </el-input>
          </el-row>
        </div>

        <transition name="fade">
          <div v-if="!searchResult">
            <div style="text-align:center" class="search-title">热门搜索</div>
            <div :key="index" v-for="(item,index) in searchSuggestion" class="tagwrapper">
              <el-tag @click.native="searchValue=item" type="success">{{item}}</el-tag>
            </div>
          </div>
          <div v-else style="background-color:#fefefe; height:100%;overflow:hidden;">
            <TeachList :all-users="searchResult"></TeachList>
          </div>
        </transition>

        <transition name="fade">
          <div v-if="loginModal " :body-style="{padding: '0px'} ">
            <div class="float-content ">
              <div class="float-text ">如需查看详细信息或进行筛选搜索，请您</div>
              <div style="display:flex;margin-top:1em;justify-content:space-between; padding: 0 20px;">
                <el-button @click="toLoginPage()" style="width:6em; border: 1px solid #0BB179" size="large " type="text ">登录</el-button>
                <el-button @click="toSignupPage()" size="large " style="width:6em; " type="primary ">注册</el-button>
              </div>
            </div>
          </div>
        </transition>

      </div>
    </div>

  </div>
</template>

<script>
// import AV from 'leancloud-storage'
import TeachList from './Teacher/TeachList'
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'search',
  computed: {
    ...mapGetters([
      'loggedIn',
      'loginModal',
      'userInfo',
      'user'
    ])
  },
  components: {
    TeachList
  },
  mounted: function () {
    // document.getElementById('searchInput').focus()
    document.getElementsByTagName('input')[0].focus()
  },
  data() {
    return {
      currentDate: new Date(),
      user_name: 'HLH',
      searchModal: true,
      searchValue: '',
      searchResult: '',
      searchSuggestion: [
        '庄',
        '心昊 男',
        '语文',
        '庄老师 我是最强的！'
      ],
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
    toBack: function () {
      this.$router.go(-1)
    },
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
      let self = this
      console.log(self.user)
      if (self.user.role === '') {
        self.showLoginModal()
      } else if (self.searchValue !== '' && self.user.role === false) {
        fetch('https://api.houaa.xyz/person/teacher/list/', {
          credentials: 'include',
          method: 'POST',
          body: JSON.stringify({
            searchText: self.searchValue
          })
        }).then(raw => raw.json())
        .then(json => {
          if (json.status === 'error') {
            self.$message(json.payload)
          } else {
            self.searchResult = json.payload
          }
        })
      } else if (self.searchValue !== '' && self.user.role === true) {
        fetch('https://api.houaa.xyz/person/student/list/', {
          credentials: 'include',
          method: 'POST',
          body: JSON.stringify({
            searchText: self.searchValue
          })
        }).then(raw => raw.json())
        .then(json => {
          if (json.status === 'error') {
            self.$message(json.payload)
          } else {
            self.searchResult = json.payload
          }
        })
      }
        // let query = new AV.SearchQuery('TeacherList')
        // query.queryString(self.searchValue)
        // query.find().then(function (result) {
        //   console.log(query.hits())
        //   self.searchResult = result
        // })
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
      this.hideLoginModal()
    },
    toSignupPage: function () {
      this.$router.push('/signup')
      this.hideLoginModal()
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

.search-input input {
  text-align: cemter;
  height: 25px;
  background-color: #343434;
  border: #5E5E5F solid 1px;
  color: #1B8F2A;
  /*border:20px;*/
}
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.tagwrapper {
  display: flex;
  justify-content: center;
  margin-bottom: 0.8em;
}

.el-tag {
  cursor: pointer;
  padding: 4px 10px;
  margin: 1px 0;
  height: 100%;
  font-size: 1.1em;
  font-weight: 300;
  border-color: #0BB279;
  color: #0BB279;
}

.search-margin {
  margin-bottom: 10px;
}

.search-section {
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
  height: 25px;
  /*MAYBE BAD*/
  text-align: center;
}

.tag-font:focus,
.tag-font:hover {
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
  background-color: #eee;
  animation-name: fromLef;
  animation-duration: 0.4s;
}

.search-title {
  color: #888;
  margin: 20px 0;
  font-size: 1.3em;
  font-weight: 200;
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
  background-color: #eee;
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
