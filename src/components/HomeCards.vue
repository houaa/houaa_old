<template>
  <div>
    <el-row  :gutter="10">
      <el-col class="main-card" :xs="12" :sm="8" :lg="6" v-for="(o,index) in 6">
        <el-card :body-style="{padding: '0px'}">
          <img src="../assets/logo.png" class="image">
          <div style="padding: 14px;">
            <span>Hey, hlh</span>
            <div class="bottom">
              <time class="time">{{ currentDate }}</time>
              <el-button v-on:click="showDetail" type="text" class="button">了解详情</el-button>
            </div>
          </div>
        </el-card>
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
			currentDate: new Date()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
