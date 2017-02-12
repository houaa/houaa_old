<template>
  <div class="main-contianer">
    <div class="welcome-msg">
      <span v-if="!login">欢迎来到猴啊家教，您尚未<span class="login" v-on:click="login=true">登录！</span></span>
      <span v-else>欢迎来到猴啊家教，{{user_name}}！ <span class="login" v-on:click="login=false">注销</span></span>      
    </div>
    <el-row>
      <el-col :span="17">
        <span class="title">谁在教</span><span class="title">|</span><span class="title small">谁在学</span>
      </el-col>
      <el-col :span="7" class="icons">
        <i class="el-icon-date one-icon"></i>
        <i class="el-icon-edit one-icon"></i>
        <i v-on:click="search" class="el-icon-search one-icon"></i>				
      </el-col>
    </el-row>
    <el-row  :gutter="10">
      <el-col class="main-card" :xs="12" :sm="8" :lg="6" v-for="(o,index) in 6">
        <el-card :body-style="{padding: '0px'}">
          <img src="../assets/logo.png" class="image">
          <div style="padding: 14px;">
            <span>Hey, hlh</span>
            <div class="bottom clearfix">
              <time class="time">{{ currentDate }}</time>
              <el-button v-on:click="showDetail" type="text" class="button">了解详情</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <div v-if="modalDisplay" v-on:click="closeModal" class="float-container" :body-style="{padding: '0px'}">
      <div class="float-content">
        <div class="float-text">
        如需查看详细信息或进行筛选搜索，请您
        </div>
        <button class="btn  gray" type="button"><span>登录</span></button>
        <button class="btn" type="button"><span>注册</span></button>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      currentDate: new Date(),
      login: false,
      user_name: 'HLH',
      modalDisplay: false
    }
  },
  methods: {
    showDetail: function (event) {
      this.modalDisplay = !this.modalDisplay
    },
    closeModal: function (event) {
      if (event.target.className === 'float-container') {
        this.modalDisplay = false
      }
    },
    search: function (event) {
      if (this.login === false) {
        this.modalDisplay = true
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
<style scoped>
.float-container{
  position: fixed;
  z-index: 2;
  left: 0%;
  top: 0px;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0,0,0.6);
}
.float-content{
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
.float-text{
  font-size: 24px;
  color: #444444;
  padding: 2.5%;
  margin-bottom: 10%;
}

.main-card{
  margin-top: 20px;
}
.login{
  color: orange;
}

.main-contianer {
  padding: 20px;
  padding-left: 5%;
  padding-right: 5%;
  overflow: scroll;
  height: 100%;
}
::-webkit-scrollbar{
  display: none;
}
.welcome-msg{
  color: #fefefe;
  font-size: 14px;
  margin-bottom: 25px;
}

.title {
  color: #f0f0f0;
  font-size: 40px;
  font-weight: bold;
  letter-spacing: 0.5px;
  border: 1px #000000;
}

.title.small{
  font-size: 25px;
  font-weight: normal;
  color: #e0e0e0;
}
.icons{
  font-size: 25px;
  font-weight: normal;
  color: #e0e0e0;
  position: absolute;
  float: left;
  bottom: 5px;
  right: 0;
}
.one-icon{
  float: right;
  margin-left: 5%;
}

.image{
  width: 100%;
  display: block;
}
.time{
  font-size: 13px;
  color: #999;
}


.btn{
  position: relative;
  display: block;
  margin: 0px auto 10px;
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
</style>
