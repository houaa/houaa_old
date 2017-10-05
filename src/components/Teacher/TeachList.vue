<template>
  <div class="teach-container">
    <div v-show="showList" style="border-bottom:1px solid #eee;">
      <div style="width:100%;display:flex;height:3em;">
        <div :style="{color: (index+1===Math.abs(filterSelected) && filterSelected!=='')?'#00AF63':'#444444'}" v-for="(item,index) in filterKeywords"
          :key="index" @click="filterIt(index)" class="section-filter">
          {{item}}
          <i v-if="-filterSelected===index+1" style="margin-left:0.5em;" class="el-icon-arrow-up"></i>
          <i v-else style="margin-left:0.5em;" class="el-icon-arrow-down"></i>
        </div>
      </div>
      <div v-show="filterSelected===3" style="height:6em;width:100%;margin:0.5em 2em 0 2em;">
        <div>
          <span>选择性别：</span>
          <el-checkbox v-model="g_male">男</el-checkbox>
          <el-checkbox v-model="g_female">女</el-checkbox>
          <el-button @click="resetFilter" style="margin-left:3em;" type="text">重置筛选</el-button>
        </div>
        <div style="margin-top:0.3em;">
          <span>选择每小时价格：</span>
          <el-select size="mini" v-model="s_salary" placeholder="选择价格">
            <el-option v-for="item in salaryOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
    </div>
    <el-row v-show="showList">
      <transition-group name="el-fade-in-linear">
        <el-col class="main-card" :xs="24" :sm="8" :lg="6" @click.native="showDetail(index, $event)" :key="index" v-for="(user,index) in filteredUsers">
          <div style="flex-shrink:0;flex-basis:25%;display:flex;justify-content: center;align-items: center;">
            <div :style="{backgroundColor: allUsers[0].role?'#00AF63':'#0271C9'}" style="width:2em;height:2em;color:#fff;font-size:2em;border-radius:50%;text-align:center;display:flex;justify-content: center;align-items: center;">
              {{user.name?user.name[0]:'未'}}
            </div>
          </div>
          <div style="flex-grow:1;margin: auto 0.5rem auto 0.5rem;padding: 0.6rem 1.5rem 0.6rem 0rem;">
            <div style="font-size: 14px; color: #555;justify-content:space-around; ">
              <!-- <div style="margin-bottom:0.4em;">学科</div> -->
              <!-- <div style="margin-bottom:0.4em;">{{edu[user.attributes.edu]}} {{grades[user.attributes.edu][user.attributes.grade]}}</div> -->
              <!-- <div style="margin-bottom:0.4em;">地点：{{user.attributes.campus}}</div> -->
              <div>
                <div id="class">
                  <div class="eduRankShow">
                    <div id="classes">
                      <!-- <i v-for="i in [0,1]" v-bind:class="user.teach[0][i]?'ok':'not'">
                  {{classes[0][i]}}
                </i>
                <i v-for="i in [0,1,2]" v-bind:class="user.teach[1][i]?'ok':'not'">
                  {{classes[1][i]}}
                </i>
                <i v-for="i in [0,1,2]" v-bind:class="user.teach[2][i]?'ok':'not'">
                  {{classes[2][i]}}
                </i> -->
                    </div>
                  </div>
                  <!-- <div class="eduRankShow">
              <div>初中</div>
              <div id="classes">
                <i v-for="i in [0,1,2]" v-bind:class="user.attributes.teach[1][i]?'ok':'not'">
                  {{classes[1][i]}}
                </i>
              </div>
            </div>
            <div class="eduRankShow">
              <div>高中</div>
              <div id="classes">
                <i v-for="i in [0,1,2]" v-bind:class="user.attributes.teach[2][i]?'ok':'not'">
                  {{classes[2][i]}}
                </i>
              </div>
            </div> -->
                </div>
              </div>
              <div>
                <el-tag style="margin-right:0.5em;text-overflow: ellipsis;max-width: 100px;overflow: hidden;" v-for="(tag,index) in user.tags" :key="index" type="success">{{tag}}</el-tag>
              </div>
            </div>
          </div>

          <div style="display:flex;jusitfy-content:center;align-items:center;margin-right:2em;">
            <div class="teacher-salary" :style="{color: allUsers[0].role?'#00AF63':'#0271C9'}">￥{{user.salary}}</div>
            <!-- <el-button type="primary" @click="showDetail(index, $event)">查看详情</el-button> -->
          </div>
        </el-col>
      </transition-group>
    </el-row>

    <div v-if="!showList && currentTeacher">
      <div style="justify-content: space-between;" id="Main" class="Content1">
        <div id="Meta">
          <div id="Name" style="display:flex;">
            <div style="outline:none;font-weight: 800;font-size: 24px;color: rgb(11, 178, 121);width: 95px;border: none;">{{currentTeacher.name[0]}}同学</div>
            <div v-if="currentTeacher.sex" style="display: inline-block;position:relative;top:4px;margin-left: 5px;"><img width="20" src="../../assets/female.svg"></div>
            <div v-else style="display: inline-block;position:relative;top:4px;margin-left: 5px;"><img width="20" src="../../assets/male.svg"></div>
          </div>

          <div id="DetailMeta" style="margin-top: 20px;">
            <div id="edu" style="outline:none;color: rgb(187, 187, 187);margin-right:5px;font-weight:300;">{{currentTeacher.gradeGroup.name}}</div>
            <div id="edu" style="outline:none;margin-right:5px;font-weight:300;">{{currentTeacher.grade.name}}</div>
            <div v-if="currentTeacher.auth" id="auth">
              <img width="20" style="padding-top:3px;" src="../../assets/auth.svg">
            </div>
            <div v-else id="auth">
              未认证
            </div>
          </div>
        </div>

        <div id="rate" style="text-align: right;font-size: 23px;color: #0bb279; font-weight: 600;">
          <div style="color: #000;font-weight: 300;font-size:16px;padding-top: 5px;">
            注册“猴啊”
            <span style="font-weight: 400;color:rgb(11, 178, 121)">
              <!-- {{((new Date()) - currentTeacher.createdAt)/3600000/24}}天 -->
              </span>
            <span style="font-weight: 400;color:rgb(11, 178, 121)">
              {{Math.floor((new Date() - currentTeacher.joinedAt)/3600000/24)}}天
              </span>
          </div>
          <div style="margin-top:15px;letter-spacing:2px;">
            <!-- {{currentTeacher.rate}}
            <i style="font-size: 12px;font-style: normal; font-weight: 400;"> 分</i> -->
          </div>
        </div>
      </div>

      <div id="detail" class="part">
        <div class="Content1">
          <div>薪资</div>
          <div>
            <span style="font-size: 17px;margin-right: 5px;color: #0bb279;font-weight: 600;">¥ {{currentTeacher.salary}}</span>
            <span style="font-size:16px; font-weight:200;">/小时</span>
          </div>
        </div>

        <div class="Content1">
          <div>地点</div>
          <div style="font-size:16px;font-weight:200;">{{currentTeacher.campus.name}}</div>
        </div>

        <div class="Content1">
          <div>年级</div>
          <div style="font-size:16px">{{currentTeacher.grade.name}}</div>
        </div>

        <div class="Content1" style="flex-direction: column;">
          <div>科目</div>
          <div id="class">
            <div class="eduRank" v-for="(subjects, i) in currentTeacher.subjectTable">
              <div>{{subjects.name}}</div>
              <div id="classes">
                <i v-for="(subject, j) in subjects.subjects" v-bind:class="subject.checked?'ok':'not'">
                  {{subject.name}}
                </i>
              </div>
            </div>
          </div>
        </div>
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
                <div class="time " v-bind:class="currentTeacher.availableTime[i][j] ? 'okTime': 'notTime' "></div>
              </div>
            </div>
          </div>
        </div>
        <div style="text-align:center;">
          <el-button class="button" v-on:click="showList=true" style="margin:1em 1em;color:#0BB179;border:1px solid #0BB179;">返回</el-button>
          <el-button :disabled="((location.hash.indexOf('teacher') !== -1) ^ user.role) % 2 === 0" class="button" v-on:click="confimModal=true" style="margin-top:1em;"
            type="primary">预约</el-button>
        </div>
      </div>
    </div>

    <transition name="el-zoom-in-bottom">

      <div v-if="confimModal " v-on:click="closeModal " class="float-container2 " style="display:flex;flex-direction:column;justify-content:flex-end;">
        <div style="box-shadow:#515050 0px -0.5px 30px 0px;height:25%;background-color:#fff; ">
          <div style="padding:2em 2em 1em 2em; ">
            <h3 style="padding-bottom:0.8em;margin-bottom:1em;border-bottom:1px solid #eee; ">是否确认预约这位教师？</h3>
            <div style="display:flex;margin-top:1em;justify-content:space-between; padding: 0 20px;">
              <el-button @click="confimModal=false " style="width:6em; border: 1px solid #0BB179" size="large " type="text ">取消</el-button>
              <el-button @click="buy(currentIndex) " size="large " style="width:6em; " type="primary ">生成订单</el-button>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <transition name="fade">
      <div v-if="loginModal " v-on:click="closeModal " class="float-container " :body-style="{padding: '0px'} ">
        <div class="float-content ">
          <div class="float-text ">如需查看详细信息或进行筛选搜索，请您</div>
          <div style="display:flex;margin-top:1em;justify-content:space-between; padding: 0 20px;">
            <el-button @click="toLoginPage()" style="width:6em; border: 1px solid #0BB179" size="large " type="text ">登录</el-button>
            <el-button @click="toSignUp()" size="large " style="width:6em; " type="primary ">注册</el-button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  // import AV from 'leancloud-storage'  // 数据库对象
  import {
    mapGetters,
    mapMutations,
    mapActions
  } from 'vuex'
  export default {
    name: 'teach',
    created: function () {
      const self = this
      if (this.user.role === '') {
        fetch('https://api.houaa.xyz/person/me/', {
          method: 'GET',
          credentials: 'include'
        }).then(raw => raw.json())
        .then(json => {
          if (json.status === 'error') {
          } else {
            self.getInfo(json.payload)
          }
        }).catch(err => {
          console.log(err)
        })
      }
    },
    computed: {
      ...mapGetters([
        'loggedIn',
        'allTeachers',
        'teachURL',
        'user'
      ]),
      role: function () {
        return document.location.hash.indexOf('teacher') !== -1
      },
      filteredUsers: function () {
        let filtered = this.allUsers
        let selected = this.filterSelected
        let self = this
        if (Math.abs(selected) === 1) {
          filtered = filtered.sort((a, b) => {
            return (a.createdAt - b.createdAt) * selected
          })
        } else if (Math.abs(selected) === 2) {
          filtered = filtered.sort((a, b) => {
            return (b.salary - a.salary) * selected
          })
        }
        if (!this.g_female) {
          filtered = filtered.filter(a => {
            return a.sex !== 1
          })
        }
        if (!this.g_male) {
          filtered = filtered.filter(a => {
            return a.sex !== 0
          })
        }
        if (this.s_salary) {
          filtered = filtered.filter(a => {
            return a.salary < self.s_salary && a.salary > self.s_salary - 50
          })
        }
        return filtered
      }
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
        location: window.location,
        loginModal: false,
        showList: true,
        confimModal: false,
        // edu: ['小学', '初中', '高中', '本科'],
        // grades: [['一年级', '二年级', '三年级', '四年级', '五年级', '六年级'], ['初一', '初二', '初三'], ['高一', '高二', '高三'], ['大一', '大二', '大三', '大四']],
        // classes: [['全科', '陪读'], ['数学', '科学', '英语'], ['数学', '理综', '英语']],
        currentTeacher: '',
        currentIndex: 0,
        days: ['一', '二', '三', '四', '五', '六', '日'],
        extraMsg: '',
        filterSelected: '',
        filterKeywords: ['按时间', '按价格', '筛选'],
        g_male: true,
        g_female: true,
        s_salary: '',
        salaryOptions: [{
          value: 50,
          label: '小于50'
        }, {
          value: 100,
          label: '50-100'
        }, {
          value: 150,
          label: '100-150'
        }, {
          value: 200,
          label: '大于200'
        }]
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
      ...mapActions([
        'getInfo'
      ]),
      resetFilter: function () {
        this.g_female = true
        this.g_male = true
        this.s_salary = ''
      },
      filterIt: function (index) {
        index = index + 1
        if (index === this.filterSelected) {
          this.filterSelected = -index
        } else {
          this.filterSelected = index
        }
      },
      handleValue: function (value) {},
      closeModal: function (event) {
        if (event.target.className === 'float-container') {
          this.loginModal = false
        } else if (event.target.className === 'float-container2') {
          this.confimModal = false
        }
      },
      showDetail: function (index, event) {
        const self = this
        fetch('https://api.houaa.xyz/account/isLogin/', {
          method: 'GET',
          credentials: 'include'
        }).then(raw => raw.json())
        .then(json => {
          if (json.status === 'error') {
            self.$message(json.payload)
          } else {
            if (json.payload) {
              fetch(`https://api.houaa.xyz/person/${this.role ? 'teacher' : 'student'}/${this.role ? this.allUsers[index].teacherId : this.allUsers[index].studentId}/info/`, {
                method: 'GET',
                credentials: 'include'
              }).then(raw => raw.json())
              .then(json => {
                if (json.status === 'error') {
                  self.$message(json.payload)
                } else {
                  self.currentTeacher = json.payload
                  self.currentIndex = index
                  self.showList = false
                }
              })
            } else {
              self.loginModal = true
            }
          }
        })
        // if (!AV.User.current()) {
        //   this.loginModal = true
        // } else {
        //   // this.loginModal = true
        //   // console.log(this.allUsers[index].toJSON()) // log检查用户
        //   this.currentTeacher = this.allUsers[index].toJSON()
        //   this.currentIndex = index
        //   this.showList = false
        //   // this.$router.push('/detail')
        // }
      },
      buy: async function (index) {
        let self = this
        // TODO: 检验重复
        self.setReserveDirty(true)
        self.confimModal = false // new router
        self.setOrdered(this.currentTeacher)
        self.toOrder()
        // let self = this
        // if (!AV.User.current()) {
        //   self.$router.push('/login')
        //   return
        // }
        // let query = new AV.Query('TeacherMapUser')
        // query.equalTo('User', AV.User.current())
        // query.equalTo('Teacher', self.allUsers[index])
        // query.find().then(result => {
        //   if (result.length > 0) {
        //     console.log(result)
        //     self.$message('你已经预约过这个老师了')
        //     self.setOrdered(this.currentTeacher)
        //     self.toOrder()
        //   } else {
        //     self.setReserveDirty(true)
        //     self.confimModal = false // new router
        //     self.setOrdered(this.currentTeacher)
        //     self.toOrder()
        //   }
        // })
      },
      toOrder: function (currentTeacher) {
        this.$router.push('/order')
      },
      toLoginPage: function () {
        this.$router.push('/login')
      },
      toSignUp: function () {
        this.$router.push('signup')
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .teacher-salary {
    font-size: 1.5em;
  }


  .section-filter {
    flex-grow: 1;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #444444;
    /* border-right: 1px solid #eee; */
  }

  .section-filter:nth-of-type(3) {
    border-right: none;
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
    padding-bottom: 10px;
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
    padding: 3.5rem 1rem 2rem 1rem;
    left: 50%;
    /*right: 0;*/
    transform: translateX(-50%);
    top: 160px;
    width: 70%;
    height: 30%;
    overflow: auto;
    background-color: #fefefe;
  }

  .float-text {
    font-size: 20px;
    font-weight: 200;
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
    border-bottom: 1px solid rgb(238, 238, 238);
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

  #time {
    margin-top: 20px;
  }

  .eduRank {
    display: block;
    margin-top: 20px;
  }

  .eduRank> :first-child {
    font-size: 15px;
    line-height: 30px;
    margin-left: 20px;
    display: inline-block;
    vertical-align: top;
  }

  .eduRank> :last-child {
    display: inline-block;
    width: 80%;
  }

  .eduRank>#classes>i {
    border-radius: 7px;
    font-style: normal;
    margin-left: 20px;
    text-align: center;
    display: inline-block;
    padding: 2px 5px;
  }

  .eduRank>#classes>i.ok {
    background: #0bb279;
    color: #FFF;
    border: #0bb279 1px solid;
    margin-bottom: 5px;
    font-size: 14px;
    font-weight: 600;
  }

  .eduRank>#classes>i.not {
    border: #bbb 1px solid;
    margin-bottom: 5px;
    color: #bbb;
    font-weight: 600;
    font-size: 14px;
  }


  .eduRankShow>#classes>i.ok {
    /* background: #0bb279; */
    color: #444;
    border: #444 1px solid;
    margin-bottom: 5px;
    font-size: 12px;
    font-weight: 200;
  }

  .eduRankShow>#classes>i.not {
    display: none;
  }

  .eduRankShow>#classes>i {
    border-radius: 7px;
    font-style: normal;
    text-align: center;
    display: inline-block;
    padding: 2px 5px;
    margin: 0 2px;
  }
</style>
