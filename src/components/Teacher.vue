<template>
  <div>
    <el-card>
      <el-row :gutter="20">
        <el-col :span="10">
          <img src="../assets/logo.png" class="image">
        </el-col>
        <el-col :span="14">
          <div class="title" >
            {{ currentTeacher.name }}
          </div>
          <div style="margin-bottom: 15px; font-size: 18px">
            评分： {{currentTeacher.ratings}}/5.0
          </div>
          <div>
            <el-button v-on:click="reserve()" type="success" style="font-size: 20px; width: 80%; border-color: #21B046;background-color: #21B046">预约</el-button>
          </div>
        </el-col>
      </el-row>
      <div class="sub-title">基本信息</div>
      <div class="content">{{currentTeacher.description}}</div>

      <div class="sub-title">教学偏好</div>
      <div class="content">
        志愿科目: {{currentTeacher.area}}<br>
        空余时间: 随意咯<br>
        预期价位: 无上限<br>
        地点偏好: OK<br>
      </div>
      <div class="sub-title">联系方式</div>
      <div class="content">
        手机：{{currentTeacher.phone}}<br>
        微信：Don't Know<br>
        QQ：Don't Know<br>
        邮箱: Don't Know<br>
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'hello',
  computed: {
    ...mapGetters([
      'allTeachers',
      'currentTeacher'
    ])
  },
  methods: {
    reserve () {
      this.$message('预约成功')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-row{
  margin-top: 15px;
}
.content {
  font-size: 16px;
  font-weight: lighter;
}
.sub-title{
  margin-top: 20px;
  margin-bottom: 0px;
  font-weight: bold;
  font-size: 20px;
}
.title {
  font-size: 26px;
  margin-bottom: 8px;
  font-weight: bold;
}
.image {
  width: 100%;
}
</style>
