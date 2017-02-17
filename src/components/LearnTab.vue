<template>
  <el-col class="tab-col" :span="8">
    <div style="height: 60%">	<img class="tab-icon" :src="imgUrl"></div>
    <div style="text-align: center">{{tabContent}}</div>
  </el-col>
</template>

<script>
export default {
  name: 'hello',
  props: [
    'tabContent',
    'imgUrl'
  ],
  data () {
    return {
      // tabContent: '项目管理',
      // imgUrl: '../assets/project.svg'
    }
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
</style>
