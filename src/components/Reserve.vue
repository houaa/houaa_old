<template>
  <div>
    <div class="page">
    <el-row style="border-bottom: 1px solid #ddd;">
      <div class="stitle">订单信息</div>
      <div class="content">
      <p>订单号：1244297450034</p>
      <p>状态：等待教师确认</p>
      <p>需求：教授二年级数学</p>
      <p>预约时间：每周六 19:00</p>
      </div>
    </el-row>
     <el-row style="border-bottom: 1px solid #ddd;">
      <div class="stitle">教师信息</div>
      <div class="content">
      <p>姓名：李启航</p>
      <p>联系方式：暂无</p>
      <p>学校：浙江大学紫金港校区</p>
      </div>
    </el-row>
     <el-row style="border-bottom: 1px solid #ddd;">
      <div class="stitle">学生信息</div>
      <div class="content">
      <p>姓名：李厉害</p>
      <p>地址：港湾家园</p>
      </div>
    </el-row>
     <el-row style="border-bottom: 1px solid #ddd;">
      <div class="stitle">交流</div>
      <div class="conv">
        <div class="stunm">李启航:</div>
        <div class="question">学生水平咋样？</div>
      </div>
      <div class="conv">
        <div class="question">回复</div>
      </div>

  </el-form-item>
      
    </el-row>
  </div>
  </div>
</template>

<script>
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.stunm{
  font-size:13px;
  font-style: italic;
  color: #aaa;
}

.question{
  font-size:13px;
  color: #aaa;
}

.conv{
  margin-top:10px;
  border: 1px solid #ddd;
  padding: 10px;
}

.page{
  padding: 15px;
  background-color: white;
  /*margin: 0;*/
}

.content{
  font-size: 14px;
  line-height: 0.8rem;
}

.stitle{
  /*font-size: 1.2rem;*/
  margin-top:20px;
  font-weight: 600;
}
.section-left{
  padding-top:1.6rem;
  padding-bottom: 1.6rem;
  padding-left: 1.6rem;
  line-height: 1.8rem;
  /*text-align: center;*/
}
</style>
