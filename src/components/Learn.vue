<template>

  <div class="background">
    <el-row class="bottom-tab">
      <learntab tabContent="身份认证" imgUrl="/static/validate.svg"></learntab>
      <learntab tabContent="个人信息" imgUrl="/static/person.svg"></learntab>
      <learntab tabContent="项目管理" imgUrl="/static/project.svg"></learntab>
    </el-row>
  </div>
</template>

<script>
import learntab from './LearnTab'
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components: {
    learntab
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.tab-icon{
  height: 100%;
  display: block;
  margin-left: auto;
  margin-right: auto;

}
.tab-col{
  height: 100%;
  padding: 1rem;
  color: rgb(77,77,77);
}
.bottom-tab{
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 15%;
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
