<template>
  <div>
    <h3 style="margin-left:2em;margin-top:1em;">未处理的订单</h3>
    <div v-if="unread">
      <div v-for="(item,index) in unread" :key="index" style="color:#555;padding-top:1em;border-radius:2px;border:1px solid #eee;height:4em;display:flex;justify-content:space-between;margin:1em 2em 1em 2em;font-color:#ddd;">
        <div style="padding-left:1em;">
          <span style="color:#000;font-weight:bold;font-size:1em;margin-right:1em;">{{item.name[0]}}同学</span> /
          <span>{{item.grade}}</span>
          <div style="margin-top:0.5em;">￥{{item.salary}}/小时</div>
        </div>
        <div style="display:flex;flex-direction: column; text-align:center;justify-content: center;margin-right:1em;">
          <el-button @click="toDetail(index)" type="primary">查看详情</el-button>
        </div>
      </div>
    </div>
    <div v-else style="margin-left:2.5em;">
      所有的订单都看过啦！
    </div>

    <h3 style="margin-left:2em;margin-top:1em;">已处理的订单</h3>
    <div style="margin-top:1em;">
      <div v-if="alreadyRead.length!==0">
        <div v-for="(item,index) in alreadyRead" :key="index" style="color:#555;padding-top:1em;border-radius:2px;border:1px solid #eee;height:4em;display:flex;justify-content:space-between;margin:1em 2em 1em 2em;font-color:#ddd;">
          <div style="padding-left:1em;">
            <span style="color:#000;font-weight:bold;font-size:1em;margin-right:1em;">{{item.name}}</span> /
            <span>{{item.grade}}</span>
            <div style="margin-top:0.5em;">￥{{item.salary}}/小时</div>
          </div>
          <div style="display:flex;flex-direction: column; text-align:center;justify-content: center;margin-right:1em;">
            <el-button @click="toDetail(index)" disabled type="primary">{{item.status}}</el-button>
          </div>
        </div>
      </div>
      <div v-else style="margin-left:2.5em;">
        还没有处理过的订单哟~
      </div>
    </div>

    <transition name="el-zoom-in-bottom">
      <div v-if="showDetail" v-on:click="closeModal" class="float-container" style="padding-top:40%;">
        <div style="box-shadow:#515050 0px -0.5px 30px 0px;height:100%;background-color:#fff;">
          <div style="padding:2em 2em 1em 2em;">
            <h3 style="padding-bottom:0.8em;border-bottom:1px solid #eee;">订单详情</h3>
            <div class="section">
              <div class="section-line">
                <div>科目</div>
                <div>二年级数学</div>
              </div>
              <div class="section-line">
                <div>预约时间</div>
                <div>{{currentReserve.createdAt|parseDate}}</div>
              </div>
            </div>
            <div class="section">
              <div class="section-line">
                <div>教师</div>
                <div>{{currentReserve.name}}</div>
              </div>
              <div class="section-line">
                <div>年级</div>
                <div>{{currentReserve.grade}}</div>
              </div>
              <div class="section-line">
                <div>联系方式</div>
                <div>教师确认以后查看</div>
              </div>
              <div class="section-line">
                <div>学校</div>
                <div>浙江大学</div>
              </div>
            </div>
            <div class="section">
              <div class="section-line">
                <div>自我介绍</div>
                <div>{{currentReserve.selfIntro}}</div>
              </div>
            </div>
            <div style="display:flex;margin-top:1em;justify-content:space-between;">
              <el-button @click="reject" style="width:6em;" size="large" type="text">拒绝</el-button>
              <el-button @click="accept" size="large" style="width:6em;" type="primary">接受</el-button>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import AV from 'leancloud-storage'
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'reverse',
  data() {
    return {
      showDetail: false,
      currentReserve: ''
    }
  },
  filters: {
    parseDate: function(value) {
      let result = new Date(value)
      return result.getHours() + ':' + result.getMinutes() + ' ' + (result.getMonth() + 1).toString() + '-' + result.getDate() + '-' + result.getFullYear()
    }
  },
  computed: {
    ...mapGetters([
      'reserveInfo',
      'isReserveDirty'
    ]),
    unread: function() {
      if (this.reserveInfo.length === 0) return []
      return this.reserveInfo.filter(item => {
        return item.attributes.status === '未查看'
      }).map(item => {
        let temp = item.get('Teacher')
        if (temp) return temp.toJSON()
        else return ''
      })
    },
    alreadyRead: function() {
      if (this.reserveInfo.length === 0) return []
      return this.reserveInfo.filter(item => {
        return item.attributes.status !== '未查看'
      }).map(item => {
        let temp = item.get('Teacher')
        if (temp) temp = temp.toJSON()
        else return ''
        temp.status = item.attributes.status
        return temp
      })
    }
  },
  created: function() {
    if (!AV.User.current()) {
      this.$router.push('/login')
      return
    }
    this.query()
  },
  methods: {
    ...mapMutations([
      'setReserve'
    ]),
    closeModal: function(event) {
      if (event.target.className === 'float-container') {
        this.showDetail = false
      }
    },
    toDetail: function(index) {
      let self = this
      this.showDetail = true
      self.currentReserve = self.unread[index]
    },
    reject: function() {
      let self = this
      let newRecord = this.reserveInfo.map(item => {
        if (item.attributes.Teacher.getObjectId() === self.currentReserve.objectId) {
          item.set('status', '已拒绝')
          item.save()
          item.status = '已拒绝'
          return item
        } else {
          return item
        }
      })
      self.setReserve(newRecord)
      this.showDetail = false
    },
    accept: function() {
      let self = this
      let newRecord = this.reserveInfo.map(item => {
        if (item.attributes.Teacher.getObjectId() === self.currentReserve.objectId) {
          item.set('status', '已同意')
          item.save()
          item.status = '已同意'
          return item
        } else {
          return item
        }
      })
      self.setReserve(newRecord)
      this.showDetail = false
    },
    query: function() {
      let self = this
      if (self.reserveInfo && !self.isReserveDirty) {
        return
      }
      let query = new AV.Query('TeacherMapUser')
      query.include('Teacher')
      query.equalTo('User', AV.User.current())
      query.find().then(result => {
        self.rawReserve = result
        // self.reserveInfos = result.map(function (element) {
        //   let item = element.get('Teacher').toJSON()
        //   item.status = element.attributes.status
        //   return item
        // })
        self.setReserve(self.rawReserve)
        console.log('[reserve] fetch from server...')
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.section-line {
  display: flex;
  margin-bottom: 0.5em;
}

.section-line>div:nth-child(1) {
  width: 30%;
}

.section-line>div:nth-child(2) {
  width: 70%;
}


.section {
  margin-top: 0.6em;
  border: 1px solid #00AF63;
  border-radius: 3px;
  padding: 0.6em 0.6em 0.6em 0.6em;
}

.float-container {
  position: fixed;
  z-index: 2;
  left: 0;
  top: 0px;
  width: 100%;
  height: 100%;
  overflow: auto;
  /* background-color: rgba(0, 0, 0, 0.6); */
}

.stunm {
  font-size: 13px;
  font-style: italic;
  color: #aaa;
}

.question {
  font-size: 13px;
  color: #aaa;
}

.conv {
  margin-top: 10px;
  border: 1px solid #ddd;
  padding: 10px;
}

.page {
  padding: 15px;
  background-color: white;
  /*margin: 0;*/
}

.content {
  font-size: 14px;
  line-height: 0.8rem;
}

.stitle {
  /*font-size: 1.2rem;*/
  margin-top: 20px;
  font-weight: 600;
}

.section-left {
  padding-top: 1.6rem;
  padding-bottom: 1.6rem;
  padding-left: 1.6rem;
  line-height: 1.8rem;
  /*text-align: center;*/
}
</style>
