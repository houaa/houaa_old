<template>
  <div class="teach-container">
  
    <el-row v-show="showList">
      <el-col v-on:click.native="showDetail" class="main-card" :xs="24" :sm="8" :lg="6" :key="index" v-for="(user,index) in allUsers">
        <div style="flex-shrink:0;flex-basis:25%;display:flex;justify-content: center;align-items: center;" @click="showDetail(index, $event)">
          <div style="width:2em;height:2em;color:#fff;font-size:2em;background-color:#00AF63;border-radius:50%;text-align:center;display:flex;justify-content: center;align-items: center;">
            {{user.attributes.name[0]}}
          </div>
        </div>
        <div style="flex-grow:1;margin: auto 0.5rem auto 0.5rem;padding: 0.6rem 1.5rem 0.6rem 0rem;" @click="showDetail(index, $event)">
          <div style="font-size: 14px; color: #555;justify-content:space-around; ">
            <div style="margin-bottom:0.4em;">{{user.attributes.grade}}</div>
            <div style="margin-bottom:0.4em;">加入时间：{{user.createdAt|toDate}}</div>
            <div>
              <el-tag v-for="(tag,index) in user.attributes.tags" :key="index" type="success">{{tag}}</el-tag>
            </div>
          </div>
        </div>
        <div style="display:flex;jusitfy-content:center;align-items:center;margin-right:1em;">
          <el-button @click="buy(index)">立刻预约</el-button>
        </div>
      </el-col>
    </el-row>
  
    <div v-if="!showList && currentTeacher">
      <div id="intro" class="part">
        <div id="text" style="display:flex;justify-content:space-between;">
          <div>
            <h3>{{currentTeacher.name}}</h3>
            <el-rate v-model="currentTeacher.rate" disabled show-text text-template="{value}" text-color="#ff9900">
            </el-rate>
            <el-button class="button" v-on:click="buy(currentIndex)" style="margin-top:1em;" size="small" type="primary">预约</el-button>
            <el-button class="button" v-on:click="showList=true" style="margin-top:1em;" size="small">返回</el-button>
          </div>
          <div style="flex-shrink:0;display:flex;justify-content: center;align-items: center;">
            <div style="width:2em;height:2em;color:#fff;font-size:2em;background-color:#00AF63;border-radius:50%;text-align:center;display:flex;justify-content: center;align-items: center;">
              {{currentTeacher.name[0]}}
            </div>
          </div>
        </div>
      </div>
  
      <div id="detail" class="part">
        <h3>基础信息</h3>
        <div id="sex">标签：
          <el-tag v-for="(tag,index) in currentTeacher.tags" :key="index" type="success">{{tag}}</el-tag>
        </div>
        <div id="major">年级：{{currentTeacher.grade}}</div>
        <div id="GPA">薪资：{{currentTeacher.salary}} 元/小时</div>
      </div>
      <div id="self" class="part">
        <h3>自我介绍</h3>
        <div id="content">
          {{currentTeacher.selfIntro}}
        </div>
      </div>
      <div id="time" class="part">
        <h3>空闲时间</h3>
  
        <div id="Container">
          <div class="week">
            <div class="time">
              <div>&nbsp;&nbsp;</div>
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
            <div v-for="i in [0,1,2,3,4,5,6]">
              <div>
                {{days[i]}}
              </div>
              <div v-for="j in [0,1,2]">
                <!-- <div class="time okTime"></div> -->
                <div class="time" v-bind:class="currentTeacher.availableTime[i][j]?'okTime':'notTime'"></div>
  
              </div>
            </div>
          </div>
        </div>
  
      </div>
    </div>
  
    <transition name="fade">
      <div v-if="loginModal" v-on:click="closeModal" class="float-container" :body-style="{padding: '0px'}">
        <div class="float-content">
          <div class="float-text">
            如需查看详细信息或进行筛选搜索，请您
          </div>
          <button class="btn gray" type="button">
            <span>登录</span>
          </button>
          <button class="btn" type="button">
            <span>注册</span>
          </button>
        </div>
      </div>
    </transition>
  
  </div>
</template>

<script>
import AV from 'leancloud-storage'
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'teach',
  computed: {
    ...mapGetters([
      'loggedIn',
      'loginModal',
      'allTeachers',
      'teachURL'
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
    }
  },
  props: [
    'allUsers'
  ],
  data() {
    return {
      loginModal: false,
      showList: true,
      currentTeacher: '',
      currentIndex: 0,
      days: ['一', '二', '三', '四', '五', '六', '日']
    }
  },
  methods: {
    ...mapMutations([
      'showLoginModal',
      'hideLoginModal',
      'setAllTeachers',
      'setReserveDirty'
    ]),
    handleValue: function (value) {
    },
    closeModal: function (event) {
      if (event.target.className === 'float-container') {
        this.loginModal = false
      }
    },
    showDetail: function (index, event) {
      if (!AV.User.current()) {
        this.loginModal = true
      } else {
        // this.loginModal = true
        // console.log(this.allUsers[index].toJSON())

        this.currentTeacher = this.allUsers[index].toJSON()
        this.currentIndex = index
        this.showList = false
        // this.$router.push('/detail')
      }
    },
    buy: async function (index) {
      if (!AV.User.current()) {
        this.$router.push('/login')
        return
      }
      const teacherMapUser = new AV.Object('TeacherMapUser')

      teacherMapUser.set('Teacher', this.allUsers[index])
      teacherMapUser.set('User', AV.User.current())
      teacherMapUser.set('status', '未查看')
      await teacherMapUser.save()
      this.$message('预约成功！')
      this.setReserveDirty(true)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin-top: 0em;
  margin-bottom: 0.5em;
  font-weight: bold;
  font-size: 1.2em;
}

.part {
  padding: 1.5em 2em 1.5em 2em;
  border-bottom: 1px solid #eee;
}

.main-card {
  /*margin-top: 20px;*/
  /* margin-bottom: 0.5rem;  */
  display: flex;
  border-bottom: 1px solid #eee;
  min-height: 5em;
}

.img-figure {
  display: block;
  position: relative;
  overflow: hidden;
}

#Container {
  /* width: 80%; */
  margin-left: auto;
  margin-right: auto;
  color: #7e7e7e;
}

#Container>div {
  display: flex;
  /* border-bottom: 1px solid #d8d8d8; */
  padding-bottom: 20px;
  /* padding-top: 20px; */
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
  /*padding: 10px 20px;*/
  text-align: center;
  /*width: 100%;*/
  /*opacity: 0;*/
  /*bottom: -30%;*/
  bottom: 0;
  opacity: 0.4;
  left: 0;
  transition: all 0.6s ease;
}

.main-card:hover .img-caption {
  opacity: 1;
  /*bottom: 0;*/
}



.time {
  font-size: 13px;
  color: #999;
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
  font-size: 16px;
}

div.okTime {
  background: #0bb279;
  border-radius: 15px;
  width: 30px;
  height: 30px;
  margin-left: auto;
  margin-right: auto;
}

div.notTime {
  width: 30px;
  height: 30px;
  margin-left: auto;
  margin-right: auto;
}
</style>
