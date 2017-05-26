<template>
  <div style="display:flex;width:100%;flex-direction:column;height:100%;">
    <div style="height:40%;background-color:#00AF73;
                                            flex-direction:column-reverse;display:flex;">
      <div style="display:flex;align-items:center; padding-left:2rem;
                                            height:30%; background-color: #009c66;color:#fff;">
        <span style="font-size:1.8rem;">{{title}}</span>
      </div>
      <img style="position:absolute;width:54%;right:0.3rem;top:1rem;" src="../assets/signupMask.svg"></img>
    </div>
  
    <div style="height:60%;background-color:#fff;display:flex;justify-content:space-between;flex-direction:column;">
      <div style="padding:2rem;width:100%;">
        {{caption}}
        <p v-if="state===1&&phoneNumber">{{phoneNumber}}</p>
      </div>
      <div style="width:70%;margin-left:2rem;">
        <el-input v-show="state==0" v-model="nickname" placeholder="请输入昵称"></el-input>
        <el-input v-show="state==0" placeholder="请输入手机号" icon="phone" v-model="phoneNumber"></el-input>
        <el-input v-show="state==1" v-model="veri" placeholder="请输入验证码"></el-input>
        </el-input>
      </div>
      <div style="display:flex;flex-direction:row-reverse;padding-right:2rem;height:6rem;">
        <img style="position:absolute;bottom:4rem;" width="40%" src="../assets/Houaa_logo.svg">
      </div>
      <el-button-group>
        <el-button @click="toPrev()" style="border-right: 1px solid #aaa;" icon="arrow-left">{{buttonLeft}}</el-button>
        <el-button @click="toNext()">{{buttonRight}}
          <i class="el-icon-arrow-right el-icon-right"></i>
        </el-button>
      </el-button-group>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import AV from 'leancloud-storage'
export default {
  name: 'signupnew',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      phoneNumber: '',
      state: 0,
      nickname: '',
      veri: ''
    }
  },
  methods: {
    ...mapMutations([
      'userLogin'
    ]),
    toNext: function () {
      console.log(this.state)
      let self = this
      if (this.state === 0) {
        // console.log('qwq')
        // console.log(this.nickname + 'quq')
        if (this.nickcname === '') {
          this.$message('请输入昵称')
        } if (!(/^1[3|5][0-9]\d{4,8}$/.test(this.phoneNumber))) {
          this.$message('请输入有效的手机号')
        } else {
          AV.Cloud.requestSmsCode({
            mobilePhoneNumber: self.phoneNumber,
            name: '猴啊家教',
            ttl: 10
          }).then(success => {
            self.$message('已发送短信')
            this.state = 1
          }, error => {
            self.$message('各种错误')
            console.log(error)
          })
          // this.state = 1
        }
      } else {
        if (this.veri === '') {
          this.$message('请输入验证码')
        } else {
          AV.User.signUpOrlogInWithMobilePhone(self.phoneNumber, self.veri).then(loggedInUser => {
            // console.log(loggedInUser)
            // self.setLoggedInUser(loggedInUser)
            self.userLogin(loggedInUser)
            self.$message('登陆成功')
            this.$router.push('self')
          }, error => {
            console.log(error)
          })
        }
      }
    },
    toPrev: function () {
      console.log(this.state)
      if (this.state === 1) {
        this.state = 0
      } else this.$router.push('/')
    }
  },
  computed: {
    title: function () {
      return this.state === 0 ? '您的手机号' : '验证短信'
    },
    caption: function () {
      return this.state === 0 ? '请输入你的手机号，其将用作未来登录的用户名:'
        : '我们已将验证短信发送至您的手机:'
    },
    buttonLeft: function () {
      return this.state === 0 ? '返回' : '更改手机号'
    },
    buttonRight: function () {
      return this.state === 0 ? '发送验证短信' : '下一步'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-button {
  width: 50%;
  height: 3rem;
  border-radius: 0px;
  border: 0;
  background-color: #eee;
}

.el-button:hover {
  color: #000;
  background-color: #ddd;
}

.el-input {
  margin: 5px 0;
}

.el-message-box {
  width: 60%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
