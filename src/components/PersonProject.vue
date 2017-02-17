<template>
  <div>
    <el-row v-for="(key,value) in projectData" style="border-bottom: 1px solid #aaa;">
      <el-col class="section-content" :span="10">
        {{value}}
      </el-col>
      <el-col style="padding: 0.8rem;" :span="14">
        {{key}}
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      projectData: {
        '0101': '高中数学',
        '0111': '高中物理',
        '1011': '高中物理数学'
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.section-content{
  padding-left: 2rem;
  padding-top: 0.8rem;
  padding-bottom: 0.8rem;
  text-align: left;
}
</style>
