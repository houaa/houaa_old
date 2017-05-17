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
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      username: '',
      password: '',
      email: '',
      loginPwd: '',
      loginName: '',
      phone: '',
      recaptcha: ''
    }
  },
  methods: {
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
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
