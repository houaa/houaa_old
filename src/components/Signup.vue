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
      <el-card class="box-card" style="background-color: #fefefe">
        <el-form  ref="form" :model="form">
          <el-form-item>
            <div class="group">      
                <input v-model="form.name" type="text" required>
                <label class="input-label">请设置您的用户名/邮箱</label>
            </div>
          </el-form-item>
          <el-form-item>
            <div class="group">      
                <input v-model="form.phone" type="text" required>
                <label  class="input-label">请设置您的手机号</label>
            </div>
          </el-form-item>
          <el-form-item>
            <div class="group">      
                <input  type="password" v-model="form.password" required>
                <label  class="input-label">请设置您的密码</label>
            </div>
          </el-form-item>
          <el-form-item>
            <div class="group">      
                <input  type="password" v-model="form.password" required>
                <label  class="input-label">重复输入密码</label>
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
            <button class="btn" type="button"><span>注册</span></button>
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
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      form: {
        name: '',
        password: '',
        agree: false
      }
    }
  },
  // props: {
  //   section: {
  //     type: String,
  //     default: ''
  //   }
  // },
  methods: {
    onSubmit () {
      console.log('submit')
    },
    toHome: function () {
      this.$router.push('/')
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
.el-form-item{
  margin-bottom: 10px;
}

.box-card{
  width: 100%;
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
  margin-top: 5px;
}
input[type=text],
input[type=password]{
  font-size:16px;
  padding:10px 10px 10px 5px;
  display: block;
  width: 90%;
  border: none;
  margin: auto;
  border-bottom: 2px solid #757575;
}
input[type=text]:focus,
input[type=password]:focus{
  outline: none;
}

.input-label{
  color:#999;
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
