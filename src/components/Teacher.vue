<template>
  <div>
    <el-card>
      <el-row :gutter="20">
        <el-col :span="10">
          <img src="../assets/logo.png" class="image">
        </el-col>
        <el-col :span="14">
          <div class="title" >
            {{ currentUser.userName }}
          </div>
          <div style="margin-bottom: 15px; font-size: 18px">
            评分： {{currentUser.rank}}/5.0
          </div>
          <div>
            <el-button type="success" style="font-size: 20px; width: 80%; border-color: #558b2f;background-color: #558b2f">预约</el-button>
          </div>
        </el-col>
      </el-row>
      <div class="sub-title">基本信息</div>
      <div class="content">{{currentUser.basicInfo}}</div>

      <div class="sub-title">教学偏好</div>
      <div class="content">
        志愿科目: {{currentUser.subject}}<br>
        空余时间: {{currentUser.avaTime}}<br>
        预期价位: {{currentUser.price}}<br>
        地点偏好: {{currentUser.location}}<br>
      </div>
      <div class="sub-title">联系方式</div>
      <div class="content">
        手机：{{currentUser.phoneNum}}<br>
        微信：{{currentUser.weChat}}<br>
        QQ：{{currentUser.QQ}}<br>
        邮箱: {{currentUser.mailAddr}}<br>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      currentUser: {
        userName: 'Wang BX',
        rank: 4.9,
        basicInfo: '浙江大学巨佬',
        subject: '语文数学英语无所不通',
        avaTime: '看你给多少钱',
        price: '准备好预算无限',
        location: '寝室',
        phoneNum: '16666666',
        weChat: 'wbx',
        QQ: '233',
        mailAddr: 'wbx@ym.com'
      }
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
  font-size: 18px;
  font-weight: lighter;
}
.sub-title{
  margin-top: 12px;
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
