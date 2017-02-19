<template>
  <div class="login">
	  <el-row>
        <div class="title">
          <img src="../assets/houaa.png" style="width: 12%">
          猴啊家教
        </div>
    </el-row>
    
    <el-row>
      <el-col :offset="2" :span="20">
    	<el-card>
        <el-form  ref="form" :model="form">
          <el-form-item>
            <div class="group">      
                <input v-model="form.phone" type="text" required>
                <label v-bind:class="{error: userInput[0].error}">{{userInput[0].msg}}</label>
            </div>
          </el-form-item>
          <el-form-item>
            <div class="group">      
                <input  type="password" v-model="form.password" required>
                <label v-bind:class="{error: userInput[1].error}">{{userInput[1].msg}}</label>
            </div>
          </el-form-item>
          <el-form-item>
            <div class="forget">忘记密码?</div>
          </el-form-item>
          <el-form-item>
            <button @click="login" class="btn gray" type="button"><span>登录</span></button>
          </el-form-item>
          <el-form-item>
            <button @click="toSignup" class="btn" type="button"><span>注册</span></button>
          </el-form-item>
          <el-form-item>
            <div class="notice" @click="toHome">随便逛逛?</div>
            <div>{{ this.$route.params.section }}</div>
          </el-form-item>
        </el-form>
      </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      form: {
        phone: '',
        password: ''
      },
      passwordError: '',
      phoneError: ''
    }
  },
  computed: {
    userInput: function () {
      let result = []
      if (this.phoneError !== '') {
        result.push({
          msg: this.phoneError,
          error: true,
          blank: false
        })
      } else if (this.form.phone.length > 0 && (!this.form.phone.match(/\d/g) || this.form.phone.match(/\d/g).length !== 11)) {
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
      if (this.passwordError !== '') {
        result.push({
          msg: this.passwordError,
          error: true,
          blank: false
        })
      } else if (this.form.password.length > 0 && this.form.password.length < 7 || this.form.password.length > 30) {
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
      return result
    }
  },
  methods: {
    onSubmit () {
      console.log('submit')
    },
    toHome: function () {
      this.$router.push('/')
    },
    toSignup: function () {
      this.$router.push('/signup')
    },
    login: function () {
      let self = this
      let url = 'https://api.houaa.xyz/index.php/api/auth'
      axios.post(url, self.form).then(
        response => {
          if (response.data.exit_code === '102' || response.data.exit_code === '101') {
            self.phoneError = response.data.msg
            self.form.phone = ''
          } else if (response.data.exit_code === '104' || response.data.exit_code === '203') {
            self.passwordError = response.data.msg
            self.form.password = ''
          }
          console.log(response)
        }
      ).catch(
        response => {
          console.log(response)
        }
      )
    }
  }
}
</script>

<style>

</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.error{
  color: #e74c3c !important;
}
h1, h2 {
  font-weight: normal;
}
a {
  color: #42b983;
}


.text {
    font-size: 14px;
  }

.item {
    padding: 18px 0;
  }

.el-row{
  margin-top: 14%;
}

.title {
  font-size: 30pt;
  color: #fff;
  text-shadow: 0px 0px 6px #000;
  font-weight: bold;
  margin: 5% auto 0 auto;
  text-align: center;
}
.login{
  background-color: #558b2f;
  height: 100%;
}

.group{
  position: relative;
  margin-top: 20px;
}
input{
  font-size:18px;
  padding:10px 10px 10px 5px;
  display: block;
  width: 90%;
  border: none;
  margin: auto;
  border-bottom: 2px solid #757575;
}
input:focus{
  outline: none;
}

label{
  color:#999;
  font-size: 16px;
  font-weight: normal;
  position: absolute;
  pointer-events: none;
  left: 5%;
  top: 15%;
  transition: 0.2s ease all
}
input:focus~label,
input:valid~label{
  top:-24px;
  font-size: 14px;
  color: #558b2f;
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

.notice{
  margin: 0 auto;
  margin-top: -10px;
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
