<template>
<div id="container">
  <el-card>
    <h2 id="title">
      教师
    </h2>
    <div id="intro" class="part">
      <div id="text">
        <h3 id="name">{{name}}</h3>
        <div id="meta">
          {{school}} {{grade}}
        </div>
        <el-rate
          v-model="rate"
          disabled
          show-text
          text-template="{value}"
          text-color="#ff9900">
        </el-rate>
        <el-button class="button" style="margin-top:20px;border-width:2px;color:#FFF;border-color:#00B074;background:#00B074;font-weight:600;" type="primary">预约</el-button>
      </div>
      <img width="80px" src="../assets/logo.png" alt="">
    </div>
    <div id="detail" class="part">
      <h3>基础信息</h3>
      <div id="sex">性别：{{sex}}</div>
      <div id="major">主修专业：{{major}}</div>
      <div id="available">可任课科目：{{available}}</div>
      <div id="GPA">平均绩点：{{GPA}}</div>
      <div id="exp">经验：{{exp}}</div>
    </div>
    <div id="self" class="part">
      <h3>自我介绍</h3>
      <div id="content">
        {{self}}
      </div>
    </div>
    <div id="time" class="part">
      <h3>空闲时间</h3>
    </div>
  </el-card>
</div>
</template>
<script>
export default {
  name: 'teacher',
  data() {
    return {
      name: '真诚最高',
      school: '浙江大学',
      grade: '本科二年级',
      rate: 4.0,
      sex: '男',
      major: '计算机科学',
      available: '数学 化学 物理',
      GPA: '5.0',
      exp: '',
      self: '我叫WLB，计算机专业的，所以口才不如营销专业同学的好。性格开朗。'
    }
  }
}
</script>
<style scoped>
  #container {
    padding: 4px 20px;
  }
  #title {
    color: #0bb279;
    font-size: 18px;
  }
  .part {
    border-bottom: 1px #dadada solid;
    padding-bottom: 20px;
  }
  .part#intro {
    display: flex;
    justify-content: space-between;
  }
  .part#intro #text h3{
    padding: 0;
    margin: 0;
    font-weight: 300;
    font-size: 30px;
  }
  .part#intro #text #meta {
    font-size: 16px;
    color: #a3a3a3;
    margin: 10px 0;
  }
  .part#intro img {
    width: 80px;
    height: 80px;
  }
  .part#detail>div {
    margin: 3px 0;
    font-size: 15px;
    color: #232323;
    font-weight: 400;
  }
  .part#self > div#content {
    font-size: 15px;
    line-height: 30px;
  }
  .part > h3 {
    font-size: 16px;
    color: #232323;
    text-shadow: 1px black;
  }
</style>
