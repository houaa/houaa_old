<template>
  <div id="Container">
    <div style="justify-content: space-between;">
      <div id="Meta">
        <div id="Name">
          <input v-model="name" style="outline:none;font-weight: 600;font-size: 24px;color: rgb(11, 178, 121);width: 100px;border: none;"/>
        </div>
        <div id="DetailMeta" style="margin-top: 20px;">
          <div id="auth" style="color: #0bb279;font-size: 14px;">
            {{auth?"认证教员":"非认证教员"}}
          </div>
          <div id="grade" style="font-size: 14px;margin-left: 24px;">
            {{grade}}
          </div>
        </div>
      </div>
      <div id="rate" style="text-align: right;font-size: 23px;color: #0bb279; font-weight: 600;">
        <el-rate v-model="rate" disabled v-bind:colors="['#0bb279','#0bb279','#0bb279']"/>
        <div style="margin-top:27px;letter-spacing:2px;">
          {{rate}}<i style="font-size: 12px;font-style: normal; font-weight: 400;"> 分</i>
        </div>
      </div>
    </div>
    <div class="Content1">
      <div>薪资</div>
      <div style="font-size:16px"><i style="color: #0bb279;font-style: normal;">￥ <input class="salaryInput" v-model="salary" /></i>/小时</div>
    </div>
    <div class="Content1">
      <div>科目</div>
      <div id="class">
        <div class="eduRank">
          <div>小学</div>
          <div id="classes">
            <i v-for="i in [0,1]" @click="toggleTeach(0,i)" v-bind:class="teach[0][i]?'ok':'not'">
              {{classes[0][i]}}
            </i>
          </div>
        </div>
        <div class="eduRank">
          <div>初中</div>
          <div id="classes">
            <i v-for="i in [0,1,2]" @click="toggleTeach(1,i)" v-bind:class="teach[1][i]?'ok':'not'">
              {{classes[1][i]}}
            </i>
          </div>
        </div>
        <div class="eduRank">
          <div>高中</div>
          <div id="classes">
            <i v-for="i in [0,1,2]" @click="toggleTeach(2,i)" v-bind:class="teach[2][i]?'ok':'not'">
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
        <div v-for="j in [0,1,2]" @click="toggleCalendar(i,j)" class="time" v-bind:class="availableTime[i][j]?'okTime':'notTime'">
          
        </div>
      </div>
    </div>
    <div class="Content2">
      <div>
        标签
      </div>
      <div style="">
        <el-tag :key="tag" v-for="tag in tags" :closable="true" :close-transition="false" @close="deleteTag(tag)" style="display: inline-block;border-radius: 5px;background:#0bb279;margin-right: 9px;color:#FFF;margin-bottom: 10px;">
          {{tag}}
        </el-tag>
        <el-input
          class="input-new-tag"
          v-if="newTagInputVisible"
          v-model="newTag"
          ref="saveTagInput"
          size="mini"
          @keyup.enter.native="handleNewTagConfirm"
          @blur="handleNewTagConfirm"
        >
        </el-input>
        <el-button v-else class="button-new-tag" size="small" @click="showNewTagInput">+ New Tag</el-button>
      </div>
    </div>
    <div class="Content2">
      <div>
        个人宣言
      </div>
      <el-input autosize type="textarea" v-model="selfIntro" id="SelfIntro" style="font-size:14px;color:#7e7e7e">
      </el-input>
    </div>
    <div style="color:#000;font-size:18px;font-weight:600;">
      <div>月收入排名</div>
      <el-progress :text-inside="true" :stroke-width="18" :percentage="100" status="success"></el-progress>
    </div>
  </div>
</template>
<script>
export default {
  'name': 'Self',
  data () {
    return {
      name: '庄可爱',
      sex: 1,
      auth: true,
      grade: '本科 大二',
      rate: 4.5,
      salary: 99,
      highestSalary: 120,
      teach: [[1, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
      availableTime: [[1, 0, 0], [0, 0, 1], [0, 0, 0], [0, 0, 1], [0, 0, 1], [1, 1, 1], [1, 1, 1]],
      tags: ['专业排名前20%', '学业奖学金', '性格开朗', '脾气好'],
      selfIntro: '虽然我的成绩不是最棒的，但是我相信，我一定是最有热情的，如果你愿意相信我，我一定不会让你失望',
      rankRate: 0.8,
      classes: [['全科', '陪读'], ['数学', '科学', '英语', '文科'], ['数学', '理综', '英语', '文综']],
      days: ['一', '二', '三', '四', '五', '六', '日'],
      newTag: '',
      newTagInputVisible: false
    }
  },
  methods: {
    toggleTeach(eduRank, classes) {
      const newTeach = [...this.teach]
      newTeach[eduRank][classes] = !newTeach[eduRank][classes]
      this.teach = newTeach
      // newTeach[classes] = !newTeach[classes]
      // console.log(newTeach)
      // this.$set(this.newTeach, eduRank, newTeach)
      // this.teach[eduRank][classes] = !this.teach[eduRank][classes]
    },
    toggleCalendar(day, time) {
      const newAvailableTime = [...this.availableTime]
      newAvailableTime[day][time] = !newAvailableTime[day][time]
      this.availableTime = newAvailableTime
    },
    deleteTag(tag) {
      this.tags.splice(this.tags.indexOf(tag), 1)
    },
    showNewTagInput() {
      this.newTagInputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    handleNewTagConfirm() {
      if (this.newTag) {
        this.tags.push(this.newTag)
      }
      this.newTag = ''
      this.newTagInputVisible = false
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
  #Container > div {
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
    width:78px;
    margin-left:10px;
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
  #Container > div.Content2 {
    display: block;
  }
  .Content2 > :first-child {
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
  .eduRank > :first-child {
    font-size: 18px;
    margin-left: 20px;
  }
  .eduRank > #classes > i {
    border-radius: 10px;
    font-style: normal;
    margin-left: 20px;
    text-align: center;
    display: inline-block;
    padding: 2px 5px;
  }
  .eduRank > #classes > i.ok {
    background: #0bb279;
    color: #FFF;
    border: #0bb279 2px solid;
    margin-bottom: 5px;
    font-size: 14px;
    font-weight: 600;
  }
  .eduRank > #classes > i.not {
    border: #0bb279 2px solid;
    margin-bottom: 5px;
    color: #0bb279;
    font-weight: 600;
    font-size: 14px;
  }
  div.week > div {
    flex-grow: 1;
  }
  div.week > div > div {
    flex-grow: 1;
    text-align: center;
    height: 30px;
    margin-bottom: 5px;
  }
  div.week > div.time > div {
    font-size: 16px;
  }
  div.okTime {
    background: #0bb279;
    border-radius: 15px;
    width: 30px;
    height: 30px;
    margin-left: 5px;
  }
  div.notTime {
    width: 30px;
    height: 30px;
    margin-left: 5px;
  }
</style>
<style>
  #SelfIntro > textarea{
    border: none;
    padding: 0;
  }
</style>

