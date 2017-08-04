<template>
  <div style="overflow: scroll; height: 100%">
    <el-row style="border-bottom: 1px solid #ddd;">
      <el-col class="section-left" :span="10">
        <div style="font-size: 1rem">展示照片</div>
        <div style="font-size: 0.8rem; color: #999">点击图片更换</div>
      </el-col>
      <el-col style="padding: 0.8rem;" :span="14">
        <img width="40%" src="../assets/logo.png">
      </el-col>
    </el-row>
    <el-row :key="index" v-for="(o,index) in 10" style="border-bottom: 1px solid #ddd;">
      <el-col class="section-content" :span="10">
        姓名
      </el-col>
      <el-col style="padding: 0.8rem;" :span="14">
        你好
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main-title{
  padding: 1.6rem;
  font-size: 1.2rem;
  font-weight: 600;
  border-bottom: 2px solid #999;
}
.section-left{
  padding-top:1.6rem;
  padding-bottom: 1.6rem;
  padding-left: 2rem;
  text-align: left;
  line-height:1.8rem;
}
.section-content{
  padding-left: 2rem;
  padding-top: 0.8rem;
  padding-bottom: 0.8rem;
  text-align: left;
}
</style>
