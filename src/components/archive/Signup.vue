<template>
  <div class="login">
    <el-row>
        <div class="title">
          <img src="../assets/houaa.png" style="width: 12%">
          猴啊家教
        </div>
    </el-row>
    
    <el-row>
      <el-col :span="24">
      <div class="box-card" style="background-color: #fefefe">
        <el-form  ref="form" :model="form">
          <el-form-item>
            <div class="group">      
                <input v-model="form.name" type="text" required>
                <label v-bind:class="{ inputerror : prompt[0].error}"  class="input-label">{{prompt[0].msg}}</label>
            </div>
          </el-form-item>
          <el-form-item>
            <div class="group">      
                <input v-model="form.phone" type="text" required>
                <label v-bind:class="{ inputerror : prompt[1].error}"  class="input-label">{{prompt[1].msg}}</label>
            </div>
          </el-form-item>
          <el-form-item>
            <div class="group">      
                <input  type="password" v-model="form.password" required>
                <label v-bind:class="{ inputerror : prompt[2].error}" class="input-label">{{prompt[2].msg}}</label>
            </div>
          </el-form-item>
          <el-form-item>
            <div class="group">      
                <input  type="password" v-model="form.repassword" required>
                <label v-bind:class="{ inputerror : prompt[3].error}" class="input-label">{{prompt[3].msg}}</label>
            </div>
          </el-form-item>
          
          <el-form-item>
            <div class="group">  
              <el-row :gutter="0" style="margin: 0 0 0 0;"> 
                <el-col :span="16">   
                <input  type="text" v-model="form.captcha" required>
                <label  class="input-label">请输入验证码</label>
                </el-col>
                <el-col :span="8">
                <img @click="getCaptcha" style="width: 100%; overflow: hidden; cursor: pointer" v-if="serverCaptcha.img_url" :src="serverCaptcha.img_url" />
                </el-col>
              </el-row>
            </div>
          </el-form-item>

          <el-form-item>
            <div style="margin: auto auto auto 3%">
              <el-checkbox v-model="form.agree">
                我同意接受《猴啊家教用户协议》
              </el-checkbox>
            </div>
          </el-form-item>
          <el-form-item>
            <button :disabled="!form.agree" @click="postData" class="btn" type="button"><span>{{regButton}}</span></button>
          </el-form-item>
          <el-form-item>
            <div class="notice" @click="toHome">随便逛逛?</div>
            <div>{{ this.$route.params.section }}</div>
          </el-form-item>
        </el-form>
      </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios'
import {mapMutations} from 'vuex'
export default {
  name: 'hello',
  computed: {
    prompt: function () {
      let result = []
      if (this.form.name.length > 0 && this.form.name.length < 6 || this.form.name.length > 20) {
        result.push({
          msg: '用户名不够长噢~',
          error: true,
          blank: false
        })
      } else if (this.form.name.length > 0 && !isNaN(parseInt(this.form.name.charAt(0)))) {
        result.push({
          msg: '用户名不能以数字开头~',
          error: true,
          blank: false
        })
      } else if (this.form.name.length === 0) {
        result.push({
          msg: '用户名',
          error: false,
          blank: true
        })
      } else {
        result.push({
          msg: '用户名',
          error: false,
          blank: false
        })
      }
      if (this.form.phone.length > 0 && (!this.form.phone.match(/\d/g) || this.form.phone.match(/\d/g).length !== 11)) {
        result.push({
          msg: '手机号不对噢',
          error: true,
          blank: false
        })
      } else if (this.form.phone.length === 0) {
        result.push({
          msg: '手机号',
          error: false,
          blank: true
        })
      } else {
        result.push({
          msg: '手机号',
          error: false,
          blank: false
        })
      }
      if (this.form.password.length > 0 && this.form.password.length < 7 || this.form.password.length > 30) {
        result.push({
          msg: '密码长度不够',
          error: true,
          blank: false
        })
      } else if (this.form.password.length === 0) {
        result.push({
          msg: '密码',
          error: false,
          blank: true
        })
      } else {
        result.push({
          msg: '密码',
          error: false,
          blank: false
        })
      }
      if (this.form.repassword.length > 0 && this.form.repassword !== this.form.password) {
        result.push({
          msg: '密码不匹配',
          error: true,
          blank: false
        })
      } else if (this.form.repassword.length === 0) {
        result.push({
          msg: '密码',
          error: false,
          blank: true
        })
      } else {
        result.push({
          msg: '密码',
          error: false,
          blank: false
        })
      }
      return result
    }
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      form: {
        name: '',
        password: '',
        repassword: '',
        agree: false,
        captcha: '',
        phone: ''
      },
      serverCaptcha: '',
      validate: true,
      responseData: '',
      regButton: '注册'
    }
  },
  created: function () {
    this.getCaptcha()
  },
  methods: {
    ...mapMutations([
      'userLogin',
      'setUserInfo'
    ]),
    onSubmit () {
      console.log('submit')
    },
    toHome: function () {
      this.$router.push('/')
    },
    getCaptcha: function () {
      let self = this
      let url = 'https://api.houaa.xyz/index.php/api/captcha'
      axios.get(url).then(
        response => {
          self.serverCaptcha = response.data
        }
      )
    },
    postData: function () {
      this.validate = true
      this.validateData()
      if (!this.validate) {
        console.log('error')
        return
      }
      let self = this
      let url = 'https://api.houaa.xyz/index.php/api/users'
      axios.post(url, {
        id: self.form.name,
        phone: self.form.phone,
        captcha: self.form.captcha,
        token: self.serverCaptcha.token,
        password: self.form.password
      }).then(
        response => {
          console.log(response)
          self.responseData = response.data
          if (self.responseData.msg === 'OK') {
            self.regButton = '注册成功...'
            self.userLogin()
            self.setUserInfo({
              name: self.form.name,
              phone: self.form.phone,
              token: self.form.token
            })
            self.toHome()
          } else {
            self.regButton = self.responseData.msg
          }
        }
      )
    },
    validateData: function () {
      let self = this
      for (let i = 0; i < this.prompt.length; i++) {
        if (self.prompt[i].error) {
          self.validate = false
        } else if (self.prompt[i].blank) {
          self.validate = false
          self.prompt[i].error = true
        }
      }
    }
  }
}
</script>

<style>

</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
a {
   color: #42b983;
}
.inputerror{
  color:#e74c3c !important;
}
.el-form-item{
  margin-bottom: 10px;
}

.box-card{
  padding: 30px 5px 10px 15px;
  /*width: 100%;*/
}

.text {
    font-size: 14px;
  }

.item {
    padding: 18px 0;
  }

.el-row{
  margin-top: 60px;
}

.title {
  font-size: 30pt;
  color: #fff;
  /*text-shadow: 0px 0px 6px #000;*/
  font-weight: bold;
  margin: 5% auto 0 auto;
  text-align: center;
}
.login{
  background-color: #21B046;
  height: 100%;
}

.group{
  position: relative;
  margin-top: 0px;
}
input[type=text],
input[type=password]{
  font-size:14px;
  padding:10px 10px 2px 5px;
  display: block;
  width: 90%;
  border: none;
  margin-bottom:5px;
  border-bottom: 1px solid #ddd;
}
input[type=text]:focus,
input[type=password]:focus{
  outline: none;
}

.input-label{
  color:#ddd;
  font-size: 14px;
  font-weight: normal;
  position: absolute;
  pointer-events: none;
  left: 4%;
  top: 15%;
  transition: 0.2s ease all
}
input:focus~label,
input:valid~label{
  top:-14px;
  font-size: 10px;
  color: #21B046;
}


.btn{
  position: relative;
  display: block;
  margin: -5px auto;
  padding: 0;
  overflow: hidden;
  border-width: 0;
  outline: none;
  border-radius: 2px;
  box-shadow: 0 1px 4px rgba(0, 0,0,0.6);
  background-color: #2ecc71;
  color: #ecf0f1;
  transition: background-color .3s;
  width: 95%;
}
.btn:hover,.btn:focus{
  background-color: #27ae60;
}
.btn > * {
  position: relative;
}
.btn span{
  display: block;
  padding: 12px 24px;
}
.btn.gray{
  background-color: #747474;
}
.btn .gray:hover,.btn.gray:hover{
  background-color:  #606060
}
.btn:disabled{
  background-color: #747474;
}

.notice{
  margin: 0 auto;
  margin-top: 5px;
  color: #747474;
  text-align: center;
}
.forget{
  float: right;
  right: 15%;
  margin-top: -20px;
  color: #747474;
  text-align: center;
  /*height: 15px;*/
}
</style>
