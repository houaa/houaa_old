<template>

  <div class="background">
    <span  @click="selectTab(4)" >asdfas</span>
    <el-row class="bottom-tab">
      <learntab v-on:changetab="selectTab(1)" :info="personValidate"></learntab>
      <learntab v-on:changetab="selectTab(2)" :info="personInfo" ></learntab>
      <learntab v-on:changetab="selectTab(3)" :info="projectManage"></learntab>
    </el-row>
  </div>
</template>

<script>
import learntab from './LearnTab'
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      personValidate: {
        tabContent: '身份认证',
        imgUrl: '/static/validate.svg',
        selected: true
      },
      personInfo: {
        tabContent: '个人信息',
        imgUrl: '/static/person.svg',
        selected: false
      },
      projectManage: {
        tabContent: '项目管理',
        imgUrl: '/static/project.svg',
        selected: false
      },
      currentSelected: 1
    }
  },
  components: {
    learntab
  },
  methods: {
    selectTab: function (tabIndex) {
      if (tabIndex === 1) {
        this.personValidate.selected = true
      } else {
        this.personValidate.selected = false
      }
      if (tabIndex === 2) {
        this.personInfo.selected = true
      } else {
        this.personInfo.selected = false
      }
      if (tabIndex === 3) {
        this.projectManage.selected = true
      } else {
        this.projectManage.selected = false
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bottom-tab{
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 14%;
  background-color: rgb(242,242,242);
  border-top: 1px solid rgb(153,153,153);
}
.background{
  width: 100%;
  height: 100%;
  background-color: #fff;
  /*border-radius: 7px;
  border: 2px solid #fff;*/
  position: absolute;
  left: 0;
}

</style>
