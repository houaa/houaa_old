<template>
  <div id="Container">
    <div style="justify-content: space-between;">
      <div id="Meta">
        <div id="Name">
          <input v-on:change="preventWindow" placeholder="修改姓名" v-model="user.name" style="outline:none;font-weight: 800;font-size: 24px;color: rgb(11, 178, 121);width: 91.14px;border: none;"></input>
          <div v-if="sex" style="display: inline-block;font-size: 15px;font-weight: 800;color:rgb(11, 178, 121)">女</div>
          <div v-else style="display: inline-block;font-size: 15px;font-weight: 800;color:rgb(11, 178, 121)">男</div>
        </div>
        <div id="DetailMeta" style="margin-top: 20px;">
          <!-- <div id="auth" style="color: #0bb279;font-size: 14px;text-align:center">
                                      {{user.auth?"认证教员":"非认证教员"}}
                                    </div> -->
          <div id="grade" style="font-size: 14px;">
            <select v-on:change="preventWindow" v-model="user.edu"  id="eduSelector" style="outline:none;color: rgb(187, 187, 187);margin-right:5px;">
              <option v-for="i in Array.from(Array(4).keys())" v-bind:value="i" style="outline:none;">
                {{edu[i]}}
              </option>
            </select>
            <select v-on:change="preventWindow" v-model="user.grade"  id="gradeSelector" style="color: #777;outline:none;">
              <option v-for="i in Array.from(Array(grades[user.edu].length).keys())" v-bind:value="i" style="ouotline:none">
                {{grades[user.edu][i]}}
              </option>
            </select>
          </div>
          <div v-if="user.auth" id="auth">
            已认证
          </div>
          <div v-else id="auth">
            未认证
          </div>
        </div>
      </div>
      <div id="rate" style="text-align: right;font-size: 23px;color: #0bb279; font-weight: 600;">
        <div style="color: #000;font-weight: 300;font-size:16px;padding-top: 5px;">
          注册“猴啊”<span style="font-weight: 400;color:rgb(11, 178, 121)">{{Math.floor(((new Date()) - user.createdAt)/3600000/24)}}天</span>
        </div>
        <div style="margin-top:15px;letter-spacing:2px;">
          {{user.rate}}
          <i style="font-size: 12px;font-style: normal; font-weight: 400;"> 分</i>
        </div>
      </div>
    </div>
    <div class="Content1">
      <div>我是：</div>
      <div>
        <el-switch v-on:change="preventWindow" v-if="user.role===''" v-model="teacherOrStudent" width=60 on-text="老师" off-text="学生" on-color="#13ce66" off-color="#e67e22">
        </el-switch>
        <el-switch v-on:change="preventWindow" v-else :disabled='true' v-model="user.role" :width='60' on-text="老师" off-text="学生" on-color="#13ce66" off-color="#e67e22">
        </el-switch>
      </div>
    </div>
    <div class="Content1">
      <div>薪资</div>
      <div style="font-size:16px">
        <i style="color: #0bb279;font-style: normal;">￥
          <input v-on:change="preventWindow" class="salaryInput" type="number" v-model.number="user.salary"></input>
        </i>/小时</div>
    </div>
    <div class="Content1">
      <div>科目</div>
      <div id="class">
        <div class="eduRank">
          <div>小学</div>
          <div id="classes">
            <i v-for="i in [0,1]" @click="toggleTeach([0,i])" v-bind:class="user.teach[0][i]?'ok':'not'">
              {{classes[0][i]}}
            </i>
          </div>
        </div>
        <div class="eduRank">
          <div>初中</div>
          <div id="classes">
            <i v-for="i in [0,1,2]" @click="toggleTeach([1,i])" v-bind:class="user.teach[1][i]?'ok':'not'">
              {{classes[1][i]}}
            </i>
          </div>
        </div>
        <div class="eduRank">
          <div>高中</div>
          <div id="classes">
            <i v-for="i in [0,1,2]" @click="toggleTeach([2,i])" v-bind:class="user.teach[2][i]?'ok':'not'">
              {{classes[2][i]}}
            </i>
          </div>
        </div>
      </div>
    </div>
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
        <div v-for="j in [0,1,2]" @click="toggleCalendar([i,j])">
          <div class="time" v-bind:class="user.availableTime[i][j]?'okTime':'notTime'"></div>
        </div>
      </div>
    </div>
    <div class="Content2">
      <div>
        标签
      </div>
      <div style="">
        <el-tag :key="tag" v-for="tag in user.tags" :closable="true" :close-transition="false" @close="deleteTag(tag)" style="font-weight:600;font-size:14px;display: inline-block;border-radius: 5px;background:#0bb279;margin-right: 9px;color:#FFF;margin-bottom: 10px;">
          {{tag}}
        </el-tag>
        <el-input v-on:change="preventWindow" class="input-new-tag" v-if="newTagInputVisible" v-model="newTag" ref="saveTagInput" size="mini" @keyup.enter.native="handleNewTagConfirm" @blur="handleNewTagConfirm">
        </el-input>
        <el-button v-else class="button-new-tag" style="font-weight:600;font-size:14px;" size="small" @click="showNewTagInput">+ New Tag</el-button>
      </div>
    </div>
    <div class="Content2">
      <div>
        个人宣言
      </div>
      <el-input v-on:change="preventWindow" placeholder="输入个人宣言" autosize type="textarea" v-model="user.selfIntro" id="SelfIntro" style="font-size:14px;color:#7e7e7e">
      </el-input>
    </div>
    <div style="width: 100%;">
      <el-button style="margin-left:auto;margin-right:auto;background:rgb(11, 178, 121)" type="success" @click="submit">提交</el-button>
    </div>
  </div>
</template>
<script>
import AV from 'leancloud-storage'
import { mapGetters, mapActions, mapMutations } from 'vuex'

window.addEventListener('beforeunload', function (e) {
  if (window.preventWindowClose) {
    e.returnValue = 'Changes you made may not be saved.'
    return 'Changes you made may not be saved.'
  }
})

export default {
  'name': 'Self',
  data() {
    return {
      edu: ['小学', '初中', '高中', '本科'],
      grades: [['一年级', '二年级', '三年级', '四年级', '五年级', '六年级'], ['初一', '初二', '初三'], ['高一', '高二', '高三'], ['大一', '大二', '大三', '大四']],
      classes: [['全科', '陪读'], ['数学', '科学', '英语', '文科'], ['数学', '理综', '英语', '文综']],
      days: ['一', '二', '三', '四', '五', '六', '日'],
      newTag: '',
      newTagInputVisible: false,
      teacherOrStudent: true
    }
  },
  computed: {
    ...mapGetters([
      'user'
    ])
  },
  created: function () {
    if (!AV.User.current()) {
      this.$router.push('/login')
    }
    this.getInfo(AV.User.current())
  },
  methods: {
    ...mapActions([
      'getInfo',
      'submitToAV'
    ]),
    ...mapMutations([
      'toggleTeach',
      'toggleCalendar',
      'deleteTag',
      'addTag',
      'inputText'
    ]),
    showNewTagInput() {
      this.newTagInputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    handleNewTagConfirm() {
      if (this.newTag) {
        this.addTag(this.newTag)
      }
      this.newTag = ''
      this.newTagInputVisible = false
    },
    preventWindow() {
      window.preventWindowClose = true
    },
    async submit() {
      if (this.user.salary <= 300 && this.user.salary >= 60) {
        this.inputText(['name', this.user.name])
        this.inputText(['salary', this.user.salary])
        this.inputText(['selfIntro', this.user.selfIntro])
        this.inputText(['grade', this.user.grade])
        this.inputText(['role', this.teacherOrStudent])
        this.inputText(['edu', this.user.edu])
        window.preventWindowClose = false
        await this.submitToAV()
        this.$message('修改已提交')
      } else {
        this.$message('薪水应当大于60并小于300')
      }
    }
  }
}
</script>
<style scoped>
#Container {
  width: 80%;
  margin-left: auto;
  margin-right: auto;
  color: #7e7e7e;
}

#Container>div {
  display: flex;
  border-bottom: 1px solid #d8d8d8;
  padding-bottom: 20px;
  padding-top: 20px;
}

#DetailMeta {
  display: flex;
  flex-direction: row;
}

.Content1 {
  display: flex;
  justify-content: space-between;
}

.Content1>:first-child {
  font-size: 18px;
  font-weight: 600;
  color: #000;
}

.button-new-tag {
  margin-left: 10px;
  height: 24px;
  line-height: 22px;
  padding-top: 0;
  padding-bottom: 0;
}

.input-new-tag {
  width: 78px;
  margin-left: 10px;
  height: 24px;
}

.Content1 .salaryInput {
  border: none;
  outline: none;
  width: 30px;
  text-align: right;
  font-size: 17px;
  margin-right: 5px;
  color: #0bb279;
  font-weight: 600;
}

#Container>div.Content2 {
  display: block;
}

.Content2> :first-child {
  display: block;
  cursor: pointer;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 20px;
  color: #000;
}

.eduRank {
  display: flex;
  flex-direction: row;
}

.eduRank> :first-child {
  font-size: 15px;
  line-height: 30px;
  margin-left: 20px;
}

.eduRank>#classes>i {
  border-radius: 10px;
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
  border: #0bb279 1px solid;
  margin-bottom: 5px;
  color: #0bb279;
  font-weight: 600;
  font-size: 14px;
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

#grade > select {
  appearance: none;  
  -moz-appearance: none;  
  -webkit-appearance: none;
  border: none;
  background: #FFF;
  font-size: 17px;
}

#auth {
  padding-left: 15px;
  font-size: 17px;
  color: rgb(11, 178, 121);
}
</style>
<style>
#SelfIntro>textarea {
  border: none;
  padding: 0;
}
</style>
