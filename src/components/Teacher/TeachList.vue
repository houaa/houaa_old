<template>
  <div class="teach-container">

    <el-row v-show="showList">
      <transition-group name="el-fade-in-linear">
        <el-col class="main-card" :xs="24" :sm="8" :lg="6" @click.native="showDetail(index, $event)" :key="index" v-for="(user,index) in allUsers">
          <div style="flex-shrink:0;flex-basis:25%;display:flex;justify-content: center;align-items: center;">
            <div :style="{backgroundColor: allUsers[0].attributes.role?'#00AF63':'#e67e22'}" style="width:2em;height:2em;color:#fff;font-size:2em;border-radius:50%;text-align:center;display:flex;justify-content: center;align-items: center;">
              <!-- {{user.attributes.name[0]}} -->
              {{user.attributes.name?user.attributes.name[0]:'未'}}
            </div>
          </div>
          <div style="flex-grow:1;margin: auto 0.5rem auto 0.5rem;padding: 0.6rem 1.5rem 0.6rem 0rem;">
            <div style="font-size: 14px; color: #555;justify-content:space-around; ">
              <div style="margin-bottom:0.4em;">{{edu[user.attributes.edu]}} {{grades[user.attributes.edu][user.attributes.grade]}}</div>
              <div style="margin-bottom:0.4em;">加入时间：{{user.createdAt|toDate}}</div>
              <div>
                <el-tag style="margin-right:0.5em;" v-for="(tag,index) in user.attributes.tags" :key="index" type="success">{{tag}}</el-tag>
              </div>
            </div>
          </div>

          <div style="display:flex;jusitfy-content:center;align-items:center;margin-right:2em;">
            <div class="teacher-salary" :style="{color: allUsers[0].attributes.role?'#00AF63':'#e67e22'}">￥{{user.attributes.salary}}</div>
            <!-- <el-button type="primary" @click="showDetail(index, $event)">查看详情</el-button> -->
          </div>
        </el-col>
      </transition-group>
    </el-row>

    <div v-if="!showList && currentTeacher" >
    <div style="justify-content: space-between;" id="Main" class="Content1">
      <div id="Meta">
        <div id="Name" style="display:flex;">
          <div style="outline:none;font-weight: 800;font-size: 24px;color: rgb(11, 178, 121);width: 95px;border: none;">{{currentTeacher.name}}</div>
          <div v-if="currentTeacher.sex" style="display: inline-block;position:relative;top:4px;margin-left: 5px;"><img width="20" src="../../assets/female.svg"></div>
          <div v-else style="display: inline-block;position:relative;top:4px;margin-left: 5px;"><img width="20" src="../../assets/male.svg"></div>
        </div>
        
        <div id="DetailMeta" style="margin-top: 20px;">
          <div id="edu" style="outline:none;color: rgb(187, 187, 187);margin-right:5px;font-weight:300;">{{edu[currentTeacher.edu]}}</div>
          <div id="edu" style="outline:none;margin-right:5px;font-weight:300;">{{grades[currentTeacher.edu][currentTeacher.grade]}}</div>
          <div v-if="currentTeacher.auth" id="auth">
            <img width="20" style="padding-top:3px;" src="../../assets/auth.svg">
          </div>
          <div v-else id="auth" @click="handleAuthClick">
            未认证
          </div>
        </div>
      </div>

      <div id="rate" style="text-align: right;font-size: 23px;color: #0bb279; font-weight: 600;">
        <div style="color: #000;font-weight: 300;font-size:16px;padding-top: 5px;">
          注册“猴啊”<span style="font-weight: 400;color:rgb(11, 178, 121)">{{Math.floor(((new Date()) - currentTeacher.createdAt)/3600000/24)}}天</span>
        </div>
        <div style="margin-top:15px;letter-spacing:2px;">
          {{currentTeacher.rate}}
          <i style="font-size: 12px;font-style: normal; font-weight: 400;"> 分</i>
        </div>
      </div>
    </div>

      <div id="detail" class="part">
        <div class="Content1">
        <div>薪资</div>
        <div>
          <span style="font-size: 17px;margin-right: 5px;color: #0bb279;font-weight: 600;">¥ {{currentTeacher.salary}}</span>
          <span style="font-size:16px; font-weight:200;">/小时</span></div>
      </div>

      <div class="Content1">
        <div>地点</div>
        <div style="font-size:16px;font-weight:200;">{{currentTeacher.campus}}</div>
      </div>

      <div class="Content1">
        <div>科目</div>
        <div style="font-size:16px">{{edu[currentTeacher.edu]}}</div>
      </div>
      <!-- <h3>基础信息</h3>
      <div id="sex">标签：
        <el-tag v-for="(tag,index) in currentTeacher.tags" :key="index" type="success">{{tag}} </el-tag>
      </div>
      <div id="major">年级：{{edu[currentTeacher.edu]}} {{grades[currentTeacher.edu][currentTeacher.grade]}}</div>
      <div id="GPA">薪资：{{currentTeacher.salary}} 元/小时</div>
      <div>性别：{{currentTeacher.sex|genderParse}}</div> -->
    </div>
      <!-- <div id="self" class="part">
        <h3>自我介绍</h3>
        <div id="content">
          {{currentTeacher.selfIntro}}
        </div>
      </div> -->
      <div id="time" class="part">
        <div id="Container">
          <div class="week">
            <div class="time" style="margin-right:0.6em;">
              <div style="margin-bottom:0.6em;">&nbsp;&nbsp;</div>
              <div>
                上午
              </div>
              <div>
                下午
              </div>
              <div>
                晚上
              </div>
            </div>
            <div v-for="i in [0,1,2,3,4,5,6]" :key="i">
              <div>
                {{days[i]}}
              </div>
              <div v-for="j in [0,1,2]" :key="j">
                <div class="time" v-bind:class="currentTeacher.availableTime[i][j]?'okTime':'notTime'">
                  <i v-if='user.availableTime[i][j]' style="color:#FFF;font-size: 10px;padding-top:8px;" class="el-icon-check"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style="text-align:center;">
        <el-button class="button" v-on:click="showList=true" style="margin:1em 1em;color:#0BB179;border:1px solid #0BB179;">返回</el-button> 
        <el-button :disabled="allUsers[0].attributes.role===user.role" class="button" v-on:click="confimModal=true" style="margin-top:1em;" type="primary">预约</el-button>
        </div>
      </div>
    </div>

    <transition name="el-zoom-in-bottom">

      <div v-if="confimModal " v-on:click="closeModal " class="float-container2 " style="padding-top:140%; ">
        <div style="box-shadow:#515050 0px -0.5px 30px 0px;height:100%;background-color:#fff; ">
          <div style="padding:2em 2em 1em 2em; ">
            <h3 style="padding-bottom:0.8em;margin-bottom:1em;border-bottom:1px solid #eee; ">是否确认预约这位教师？
            </h3>

            <!-- <div class="section-line ">
              <div>教师姓名</div>
              <div>
                {{currentTeacher.name}}
              </div>
            </div>
            <div class="section-line ">
              <div>薪资：</div>
              <div>
                {{currentTeacher.salary}} 元/小时
              </div>
            </div>
            <div class="section-line ">
              <div>性别：</div>
              <div>
                {{currentTeacher.sex|genderParse}}
              </div>
            </div>

            <div class="section-line ">
              <div style=" ">留言</div>
              <div>
                <el-input type="textarea " :rows="3 " placeholder="想说什么呢 " v-model="extraMsg ">
                </el-input>
              </div>
            </div> -->
            <div style="display:flex;margin-top:1em;justify-content:space-between; ">
              <el-button @click="confimModal=false " style="width:6em; border: 1px solid #0BB179" size="large " type="text ">取消</el-button>
              <el-button @click="buy(currentIndex) " size="large " style="width:6em; " type="primary ">生成订单</el-button>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <transition name="fade ">
      <div v-if="loginModal " v-on:click="closeModal " class="float-container " :body-style="{padding: '0px'} ">
        <div class="float-content ">
          <div class="float-text ">
            如需查看详细信息或进行筛选搜索，请您
          </div>
          <button class="btn gray " type="button ">
            <span>登录</span>
          </button>
          <button class="btn " type="button ">
            <span>注册</span>
          </button>
        </div>
      </div>
    </transition>

  </div>
</template>

<script>
import AV from 'leancloud-storage'  // 数据库对象
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'teach',
  computed: {
    ...mapGetters([
      'loggedIn',
      'allTeachers',
      'teachURL',
      'user'
    ])
  },
  filters: {
    toInt: function (value) {
      return parseInt(value)
    },
    numberOnly: function (value) {
      return value.toString(0)
    },
    toDate: function (value) {
      // console.log(value)
      let newDate = new Date(value)
      if (!newDate) return ''
      return newDate.getFullYear() + '年' + (parseInt(newDate.getMonth()) + 1) + '月'
    },
    genderParse: function (value) {
      return value === 0 ? '男' : '女'
    }
  },
  props: [
    'allUsers'
  ],
  data() {
    return {
      loginModal: false,
      showList: true,
      confimModal: false,
      edu: ['小学', '初中', '高中', '本科'],
      grades: [['一年级', '二年级', '三年级', '四年级', '五年级', '六年级'], ['初一', '初二', '初三'], ['高一', '高二', '高三'], ['大一', '大二', '大三', '大四']],
      currentTeacher: '',
      currentIndex: 0,
      days: ['一', '二', '三', '四', '五', '六', '日'],
      extraMsg: ''
    }
  },
  methods: {
    ...mapMutations([
      'showLoginModal',
      'hideLoginModal',
      'setAllTeachers',
      'setReserveDirty',
      'setOrdered'
    ]),
    handleValue: function (value) {
    },
    closeModal: function (event) {
      if (event.target.className === 'float-container') {
        this.loginModal = false
      } else if (event.target.className === 'float-container2') {
        this.confimModal = false
      }
    },
    showDetail: function (index, event) {
      if (!AV.User.current()) {
        this.loginModal = true
      } else {
        // this.loginModal = true
        // console.log(this.allUsers[index].toJSON()) // log检查用户
        this.currentTeacher = this.allUsers[index].toJSON()
        this.currentIndex = index
        this.showList = false
        // this.$router.push('/detail')
      }
    },
    buy: async function (index) {
      let self = this
      if (!AV.User.current()) {
        self.$router.push('/login')
        return
      }
      let query = new AV.Query('TeacherMapUser')
      query.equalTo('User', AV.User.current())
      query.equalTo('Teacher', self.allUsers[index])
      query.find().then(result => {
        if (result.length > 0) {
          console.log(result)
          self.$message('你已经预约过这个老师了')
          self.setOrdered(this.currentTeacher)
          self.toOrder()
        } else {
          /* 预约的代码，与后端交互
          const teacherMapUser = new AV.Object('TeacherMapUser')
          teacherMapUser.set('message', self.extraMsg)
          teacherMapUser.set('Teacher', self.allUsers[index])
          teacherMapUser.set('User', AV.User.current())
          teacherMapUser.set('status', '未查看')
          teacherMapUser.save()
          self.$message('预约成功！')
          */

          self.setReserveDirty(true)
          self.confimModal = false // new router
          self.setOrdered(this.currentTeacher)
          self.toOrder()
        }
      })
    },
    toOrder: function (currentTeacher) {
      this.$router.push('/order')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.teacher-salary {
  font-size: 1.5em;
}

.part {
  padding: 0 2em 0 2em;
}

.section-line {
  display: flex;
  margin-bottom: 0.6em;
  margin-top: 0.6em;
  font-size: 16px;
}

.section-line>div:nth-child(1) {
  width: 30%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  /* text-align: center; */
}

.section-line>div:nth-child(2) {
  width: 70%;
}

.main-card {
  /*margin-top: 20px;*/
  /* margin-bottom: 0.5rem;  */
  display: flex;
  border-bottom: 1px solid #eee;
  min-height: 7.5em;
}

.img-figure {
  display: block;
  position: relative;
  overflow: hidden;
}

#Container {
  margin-left: auto;
  margin-right: auto;
}

#Container>div {
  display: flex;
  padding-bottom: 20px;
}

.float-container {
  position: fixed;
  z-index: 2;
  left: 0;
  top: 0px;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.6);
}

.float-container2 {
  position: fixed; 
  z-index: 2;
  left: 0;
  top: 0px; 
  width: 100%;
  height: 100%; 
  overflow: auto;
  /* background-color: rgba(0, 0, 0, 0.6); */
}

.float-content {
  position: fixed;
  z-index: 1;
  /*padding-top: 60px;*/
  /*padding-bottom: 30px;*/
  padding: 3.5rem 1rem 2rem 1rem;
  left: 50%;
  /*right: 0;*/
  transform: translateX(-50%);
  top: 130px;
  width: 70%;
  height: 40%;
  overflow: auto;
  background-color: #fefefe;
}

.float-text {
  font-size: 20px;
  text-align: center;
  color: #444444;
  padding: 2.5%;
  margin-bottom: 10%;
}

.btn {
  position: relative;
  display: block;
  margin: 0px auto 10px;
  padding: 0;
  overflow: hidden;
  border-width: 0;
  outline: none;
  border-radius: 2px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.6);
  background-color: #2ecc71;
  color: #ecf0f1;
  transition: background-color .3s;
  width: 95%;
}

.btn:hover,
.btn:focus {
  background-color: #27ae60;
}

.btn>* {
  position: relative;
}

.btn span {
  display: block;
  padding: 12px 24px;
}

.btn.gray {
  background-color: #747474;
}

.btn .gray:hover,
.btn.gray:hover {
  background-color: #606060
}

.img-caption {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.75);
  color: white;
  width: 100%;
  padding: 3px 0 3px 0;
  text-align: center;
  bottom: 0;
  opacity: 0.4;
  left: 0;
  transition: all 0.6s ease;
}

.main-card:hover .img-caption {
  opacity: 1;
  /*bottom: 0;*/
}

.image {
  width: 100%;
  display: block;
}

.Content1 {
  display: flex;
  justify-content: space-between;
}

div.week>div {
  flex-grow: 1;
}

div.week>div>div {
  flex-grow: 1;
  text-align: center;
  height: 30px;
  margin-bottom: 5px;
}

div.week>div.time>div {
  font-size: 14px;
}

div.okTime {
  background: #0bb279;
  border-radius: 12.5px;
  width: 25px;
  height: 25px;
  margin-left: auto;
  margin-right: auto;
}

div.notTime {
  width: 25px;
  height: 25px;
  margin-left: auto;
  margin-right: auto;
}

.Content1 {
  display: flex;
  justify-content: space-between;
  display: flex;
  border-bottom: 1px solid #ddd;
  padding-bottom: 20px;
  padding-top: 20px;
}

.Content1>:first-child {
  font-size: 1.2em;
  font-weight: 600;
  color: #000;
}

#DetailMeta {
  display: flex;
  flex-direction: row;
}

#Main {
  width: 85%; 
  margin-left: auto;
  margin-right: auto;
  color: #7e7e7e;
}

#time{
  margin-top:20px;
}
</style>
