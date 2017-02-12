<template>
  <div class="main-contianer">
    <div class="welcome-msg">
      欢迎来到猴啊家教，您尚未登录！
    </div>
    <el-row>
      <el-col :span="17">
        <span class="title">谁在教</span><span class="title">|</span><span class="title small">谁在学</span>
      </el-col>
      <el-col :span="7" class="icons">
        <i class="el-icon-date"></i>
        <i class="el-icon-edit"></i>
        <i class="el-icon-search"></i>				
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
              <el-button type="text" class="button">Operating Button</el-button>
            </div>
          </div>
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
      currentDate: new Date()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
<style scoped>
.main-card{
  margin-top: 20px;
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
  bottom: 7px;
  right: 0;
}

.image{
  width: 100%;
  display: block;
}
.time{
  font-size: 13px;
  color: #999;
}
</style>
