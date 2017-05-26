<template>
  <div id="container">
    <div id="logo">
      <img src="../assets/houaa-r.png" alt="">
      <h1>猴啊家教</h1>
    </div>
    <div id="form">
      <el-input class="input" placeholder="手机号码" v-model="phone" />
      <el-input class="input" placeholder="验证码" v-model="recaptcha" />
    </div>
    <div id="button">
      <div>
        <el-button @click="logInPhone" class="button" style="border-width:2px;color:#FFF;border-color:#00B074;background:#00B074;" type="primary">登录</el-button>
      </div>
      <div>
        <el-button @click="sendSMS" class="button" style="border-width:2px;color:#00B074;border-color:#00B074">发送验证码</el-button>
      </div>
      <div>
        <el-button @click="toSignUp" class="button" style="border-width:2px;color:#00B074;border-color:#00B074">注册</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import AV from 'leancloud-storage'
import { mapActions } from 'vuex'
export default {
  name: 'loginNew',
  data() {
    return {
      phone: '',
      recaptcha: ''
    }
  },
  methods: {
    ...mapActions([
      'getInfo'
    ]),
    toSignUp: function () {
      this.$router.push('signup')
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
    logInPhone: function () {
      let self = this
      AV.User.signUpOrlogInWithMobilePhone(self.phone, self.recaptcha).then(loggedInUser => {
        self.$message('登陆成功')
        self.$router.push('/teacher')
        // self.push('teacher')
      }, error => {
        self.$message('不对的验证码噢')
        console.log(error)
      })
    }
  }
}
</script>

<style scoped>
#container {
  width: 100%;
  height: 100%;
  background: #FFF;
  display: flex;
  flex-direction: column;
}

#logo {
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 2px;
  flex-grow: 2;
}

#logo img {
  margin-right: 10px;
  height: 50px;
}

#logo h1 {
  font-size: 45px;
  font-weight: 400;
  color: #00B074;
}

#form {
  flex-grow: 2;
  display: flex;
  flex-direction: column;
  padding: 0 25%;
}

#form .input {
  margin-top: 20px;
  font-weight: 600;
  font-size: 15px;
}

#button {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  padding: 0 25%;
}

#button .button {
  width: 100%;
  font-weight: 600;
  font-size: 15px;
  margin-top: 20px;
}
</style>
