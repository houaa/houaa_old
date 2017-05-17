<template>
  <div>
    <el-input placeholder="User Name" v-model="username"></el-input>
    <el-input placeholder="Password" v-model="password"></el-input>
    <el-input placeholder="Email" v-model="email"></el-input>
    <el-button @click="signup">test sign up</el-button>
    <hr>
    <el-input placeholder="User Name" v-model="loginName"></el-input>
    <el-input placeholder="Password" v-model="loginPwd"></el-input>
    <el-button @click="signIn">test sign in</el-button>
    <hr>
    <el-input placeholder="Mobile Phone" v-model="phone"></el-input>
    <el-input placeholder="recaptcha" v-model="recaptcha"></el-input>
    <el-button @click="sendSMS">Send message</el-button>
    <el-button @click="signInPhone">test sign in with phone</el-button>
    <hr>
    <el-input placeholder="User Name" v-model="username"></el-input>
    <el-input placeholder="Password" v-model="password"></el-input>
    <el-input placeholder="Email" v-model="email"></el-input>
    <el-button @click="testAddUser">add user</el-button>
    <el-button @click="query">query</el-button>
    <el-card v-for="(item, index) in queryResult" :key="index">
      用户名:{{item.attributes.name}},密码:{{item.attributes.password}},邮箱:{{item.attributes.email}} 生成日期:{{item.createdAt}}
    </el-card>
    <!--<div v-for="item in queryResult">{{item}}</div>-->
  </div>
</template>

<script>
import AV from 'leancloud-storage'
var APP_ID = 'bbuNR4JPyRBbqYTFkPIripnW-gzGzoHsz'
var APP_KEY = 'Vld6ht18jVtJ9M9oAdPYpCzl'
AV.init({
  appId: APP_ID,
  appKey: APP_KEY
})
export default {
  name: 'leancloud',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      username: '',
      password: '',
      email: '',
      loginPwd: '',
      loginName: '',
      phone: '',
      recaptcha: '',
      queryResult: []
    }
  },
  methods: {
    testAddUser: function () {
      let self = this
      var UserList = AV.Object.extend('UserList')
      var testObject = new UserList()
      testObject.save({
        name: self.username,
        password: self.password,
        email: self.email
      }).then(object => {
        self.$message('添加成功')
        console.log(object)
      })
    },
    query: function () {
      let self = this
      let query = new AV.Query('UserList')
      query.find().then(result => {
        self.queryResult = result
        console.log(result)
      }, error => {
        console.log(error)
      })
    },
    signup: function () {
      let user = new AV.User()
      let self = this
      user.setUsername(self.username)
      user.setPassword(self.password)
      user.setEmail(self.email)
      user.signUp().then(loggedInUser => {
        console.log(loggedInUser)
      }, error => {
        console.log(error)
      })
    },
    signIn: function () {
      let self = this
      AV.User.logIn(self.loginName, self.loginPwd).then(loggedInUser => {
        self.$message(loggedInUser.attributes.email)
        console.log(loggedInUser.attributes)
      }, error => {
        self.$message(error)
        console.log(error)
      })
    },
    sendSMS: function () {
      let self = this
      AV.Cloud.requestSmsCode(self.phone).then(success => {
        self.$message('已发送')
      }, error => {
        self.$message('各种错误')
        console.log(error)
      })
    },
    signInPhone: function () {
      let self = this
      AV.User.logInWithMobilePhoneSmsCode(self.phone, self.recaptcha).then(loggedInUser => {
        console.log(loggedInUser)
        self.$message(loggedInUser.attributes.email)
      }, error => {
        console.log(error)
      })
    },
    wechat: function () {
      AV.User.signUpOrlogInWithAuthData({
        // 微博（weibo）用 uid
        // 微信（weixin）和 QQ（qq）用 openid
        'openid': 'oPrJ7uM5Y5oeypd0fyqQcKCaRv3o',
        'access_token': 'OezXcEiiBSKSxW0eoylIeNFI3H7HsmxM7dUj1dGRl2dXJOeIIwD4RTW7Iy2IfJePh6jj7OIs1GwzG1zPn7XY_xYdFYvISeusn4zfU06NiA1_yhzhjc408edspwRpuFSqtYk0rrfJAcZgGBWGRp7wmA',
        'expires_at': '2017-06-06T11:43:11.904Z'
      }, 'weixin').then(function (s) {
        console.log(s)
      }, function (e) {
        console.log(e)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
