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

    <div v-if="searchModal" v-on:click="closeModal" class="float-container">
      <div class="search-content">
        <el-row :gutter="10" class="search-margin">
          <el-col :span="8" class="who-teach">
            谁在教
          </el-col>
          <el-col :span="16">
            <el-input  icon="search" placeholder="随便输入什么"></el-input>
          </el-col>
        </el-row>
        <el-row :gutter="10" class="search-margin">
          <el-col :span="8" class="search-txt">
            性别：
          </el-col>
          <el-col :span="16">
            <span v-on:click="clickTag(otherTag[0])">
              <el-tag  type="gray" v-bind:color="otherTag[0].value" class="tag-font" >
                {{otherTag[0].key}}
              </el-tag>
            </span>
            <span v-on:click="clickTag(otherTag[1])">
              <el-tag  type="gray" v-bind:color="otherTag[1].value" class="tag-font" >
                {{otherTag[1].key}}
              </el-tag>
            </span>
          </el-col>
        </el-row>

        <el-row :gutter="10" class="search-margin">
          <el-col :span="24" class="search-txt">
            志愿科目：
          </el-col>
        </el-row>
        
        <el-row :gutter="10" class="search-margin">
          <el-col v-for="(sub,index) in subject" :span="8" class="search-txt">
            <span v-on:click="clickTag(sub)">
              <el-tag  type="gray" v-bind:color="sub.value" class="tag-font" >
                {{sub.key}}
              </el-tag>
            </span>
          </el-col>
        </el-row>

        <el-row :gutter="10" class="search-margin">
          <el-col :span="24" class="search-txt">
            空余时间：
          </el-col>
        </el-row>
        
        <el-row :gutter="10" class="search-margin">
          <el-time-picker
            is-range
            v-model="avaTime"
            placeholder="随便什么时候">
          </el-time-picker>
        </el-row>

        <el-row :gutter="10" class="search-margin">
          <el-col :span="24" class="search-txt">
            预期价位(每小时)：
          </el-col>
        </el-row>

        <el-row :gutter="10" class="search-margin">
          <el-col :span="8" class="search-txt">
            <span v-on:click="clickTag(otherTag[2])">
              <el-tag  type="gray" v-bind:color="otherTag[2].value" class="tag-font" >
                {{otherTag[2].key}}
              </el-tag>
            </span>
          </el-col>
          <el-col :span="8" class="search-txt">
            <span v-on:click="clickTag(otherTag[3])">
              <el-tag  type="gray" v-bind:color="otherTag[3].value" class="tag-font" >
                {{otherTag[3].key}}
              </el-tag>
            </span>
          </el-col>
        </el-row>

        <el-row :gutter="10" class="search-margin">
          <el-col :span="24" class="search-txt">
            地点偏好：
          </el-col>
        </el-row>

        <el-row :gutter="10" class="search-margin">
          <el-col :span="8" class="search-txt">
            <span v-on:click="clickTag(otherTag[4])">
              <el-tag  type="gray" v-bind:color="otherTag[4].value" class="tag-font" >
                {{otherTag[4].key}}
              </el-tag>
            </span>
          </el-col>
          <el-col :span="8" class="search-txt">
            <span v-on:click="clickTag(otherTag[5])">
              <el-tag  type="gray" v-bind:color="otherTag[5].value" class="tag-font" >
                {{otherTag[5].key}}
              </el-tag>
            </span>
          </el-col>
          <el-col :span="8" class="search-txt">
            <span v-on:click="clickTag(otherTag[6])">
              <el-tag  type="gray" v-bind:color="otherTag[6].value" class="tag-font" >
                {{otherTag[6].key}}
              </el-tag>
            </span>
          </el-col>
        </el-row>
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
      modalDisplay: false,
      searchModal: false,
      subject: [
        {'key': '小学', 'value': '#dddddd'},
        {'key': '初中', 'value': '#dddddd'},
        {'key': '高中', 'value': '#dddddd'},
        {'key': '语文', 'value': '#dddddd'},
        {'key': '数学', 'value': '#dddddd'},
        {'key': '英语', 'value': '#dddddd'},
        {'key': '物理', 'value': '#dddddd'},
        {'key': '化学', 'value': '#dddddd'},
        {'key': '生物', 'value': '#dddddd'},
        {'key': '地理', 'value': '#dddddd'},
        {'key': '政治', 'value': '#dddddd'},
        {'key': '历史', 'value': '#dddddd'}],
      otherTag: [
        {'key': '男', 'value': '#dddddd'},
        {'key': '女', 'value': '#dddddd'},
        {'key': '0-100', 'value': '#dddddd'},
        {'key': '100-200', 'value': '#dddddd'},
        {'key': '紫金港', 'value': '#dddddd'},
        {'key': '西溪', 'value': '#dddddd'},
        {'key': '玉泉', 'value': '#dddddd'}
      ],

      avaTime: [new Date(), new Date().setHours(new Date().getHours + 4)]
    }
  },
  methods: {
    showDetail: function (event) {
      this.modalDisplay = !this.modalDisplay
    },
    closeModal: function (event) {
      if (event.target.className === 'float-container') {
        this.modalDisplay = false
        this.searchModal = false
      }
    },
    search: function (event) {
      if (this.login === false) {
        this.modalDisplay = true
      } else {
        this.searchModal = true
      }
    },
    clickTag: function (item) {
      if (item.value !== '#dddddd') {
        item.value = '#dddddd'
      } else {
        item.value = '#558b2f'
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
<style scoped>
.search-margin{
  margin-bottom: 10px;
}
.search-txt{
  font-size: 18px;
}
.tag-font{
  font-size: 16px;
  margin-bottom: 10px;
}
.who-teach{
  font-size: 22px;
  color: #558b2f;
}
.search-content{
  position: fixed;
  z-index: 1;
  padding: 5%;
  width: 60%;
  height: 100%;
  right: 0;
  top: 0;
  background-color: #fefefe;
}

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
  cursor: pointer;
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
