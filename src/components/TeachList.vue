<template>
  <div class="teach-container">
  
    <el-row :gutter="12">
      <el-col class="main-card" :xs="24" :sm="8" :lg="6" :key="index" v-for="(user,index) in allUsers" v-on:click.native="showDetail(index, $event)">
        <div style="width:25%;display:flex;justify-content: center;
                    align-items: center;font-size:2em;color:#00AF63;text-align:center;">
          <!--<img width="60%;" style="" src="../assets/houaa-r.png">-->
  
          {{user.attributes.name[0]}}
        </div>
        <div style="flex-grow:1;margin: auto 0.5rem auto 0.5rem;padding: 0.6rem 1.5rem 0.6rem 0rem;border-bottom:1px solid #eee;">
          <div style="padding:0.5rem 0 0.5rem 0;">
            <span style="font-size: 1.3rem;">{{user.attributes.name}}</span>
            <span style="color:#555;"> /{{user.attributes.selfIntro}}</span>
          </div>
          <div style="font-size: 14px; color: #555">
            <div>{{user.attributes.grade}}</div>
            <div>
              <el-tag v-for="(tag,index) in user.attributes.tags" :key="index" type="success">{{tag}}</el-tag>
            </div>
            <div>加入时间：{{user.createdAt|toDate}}</div>
            <!--<el-button v-on:click="showDetail(index, $event)" type="text" class="button">了解详情</el-button>-->
          </div>
        </div>
        <div>
          <el-button>立刻预约</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import AV from 'leancloud-storage'
import { mapGetters, mapMutations } from 'vuex'
import axios from 'axios'
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
      console.log(value)
      let newDate = new Date(value)
      if (!newDate) return ''
      return newDate.getFullYear() + '年' + (parseInt(newDate.getMonth()) + 1) + '月'
    }
  },
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      allUsers: {}
    }
  },
  created: function () {
    let self = this
    self.getTeachers()
  },
  methods: {
    ...mapMutations([
      'showLoginModal',
      'hideLoginModal',
      'setCurrentTeacher',
      'setAllTeachers'
    ]),
    handleValue: function (value) {
    },
    showDetail: function (index, event) {
      if (!this.loggedIn) {
        this.showLoginModal()
      } else {
        this.setCurrentTeacher(this.allUsers[index])
        this.$router.push('teacher')
      }
    },
    fetchTeachers: function () {
      let self = this
      if (!self.allTeachers) {
        axios.get(self.teachURL).then(
          response => {
            console.log(response.data)
            if (response.data.msg === 'OK') {
              this.$message({
                message: '成功获取数据',
                showClose: true,
                duration: 1000
              })
              self.allUsers = response.data.teachers.reverse().map(
                item => {
                  let newItem = item
                  newItem.ratings = parseInt(newItem.ratings)
                  return newItem
                }
              )
              self.setAllTeachers(self.allUsers)
            }
          }
        )
      } else {
        self.allUsers = self.allTeachers
      }
    },
    getTeachers: function () {
      let self = this
      let query = new AV.Query('TeacherList')
      query.find().then((result) => {
        // console.log('asdf', result)
        self.allUsers = result
        self.setAllTeachers(result)
        console.log(self.allUsers)
      }, error => {
        console.log(error)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.img-figure {
  display: block;
  position: relative;
  overflow: hidden;
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

.main-card {
  /*margin-top: 20px;*/
  margin-bottom: 0.5rem;
  display: flex;
}

.time {
  font-size: 13px;
  color: #999;
}

.image {
  width: 100%;
  display: block;
}
</style>
