<template>
  <div>
    <div class="main-title">
      认证状况 <span style="color: #21B046;">({{validateMsg}})</span>
    </div>
    <el-row style="border-bottom: 1px solid #ddd;">
      <el-col class="section-left" :span="10">
        <div style="font-size: 1rem">身份证照片</div>
        <div style="font-size: 0.8rem; color: #999">点击图片更换</div>
      </el-col>
      <el-col style="padding: 0.8rem;" :span="14">
        <img width="40%" src="../assets/logo.png">
      </el-col>
    </el-row>
    <el-row style="border-bottom: 1px solid #ddd;">
      <el-col class="section-left" :span="10">
        <div style="font-size: 1rem">身份证照片</div>
        <div style="font-size: 0.8rem; color: #999">点击图片更换</div>
      </el-col>
      <el-col style="padding: 0.8rem;" :span="14">
        <img width="40%" src="../assets/logo.png">
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'hello',
  computed: {
    validateMsg: function () {
      if (this.validated) {
        return '已认证'
      } else {
        return '未认证'
      }
    }
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      validated: true
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
  border-bottom: 2px solid #ddd;
}
.section-left{
  padding-top:1.6rem;
  padding-bottom: 1.6rem;
  padding-left: 1.6rem;
  line-height: 1.8rem;
  /*text-align: center;*/
}
</style>
