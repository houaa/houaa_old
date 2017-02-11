<template>
  <div class="login">
	  <el-row>
      <el-col :span="12" :offset="6">
        <div class="title">
          猴啊家教
        </div>
      </el-col>
    </el-row>
    
    <el-row>
      <el-col :offset="2" :span="20">
    	<el-card class="box-card">
        <el-form  ref="form" :model="form">
          <el-form-item>
              <el-input placeholder="用户名/邮箱" v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item>
            <div class="group">      
                <input type="text" required>
                <span class="highlight"></span>
                <span class="bar"></span>
                <label>密码</label>
            </div>
              <el-input type="password" placeholder="密码" v-model="form.password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="large" @click="onSubmit">登录</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="large" @click="onSubmit">注册</el-button>
          </el-form-item>
          <el-form-item>
            <div>随便逛逛</div>
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
        password: ''
      }
    }
  },
  methods: {
    onSubmit () {
      console.log('submit')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
  margin-top: 60px;
}

.title {
  font-size: 30pt;
  color: #fff;
  text-shadow: 0px 0px 6px #000;
  font-weight: bold;
}
.login{
  background-color: #558b2f;
  height: 100%;
}

.group{
  position: relative;
  margin-bottom: 45px;
}
input{
  font-size:18px;
  padding:10px 10px 10px 5px;
  display: block;
  width: 90%;
  border: none;
  margin: auto;
  border-bottom: 1px solid #757575;
}
input:focus{
  outline: none;
}

label{
  color:#999;
  font-size: 18px;
  font-weight: normal;
  position: absolute;
  pointer-events: none;
  left: 5px;
  top: 10px;
  transition: 0.2s ease all
}
input:focus~label,
input:valid~label{
  top:-20px;
  font-size: 14px;
  color: #5264AE;
}

</style>
