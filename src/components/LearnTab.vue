<template>
  <el-col class="tab-col" v-bind:class="{ tabselected: info.selected }" :span="8">
    <div @click="logaaa"  style="height: 60%">	<img class="tab-icon" :src="info.imgUrl"></div>
    <div @click="logaaa"  style="text-align: center">{{info.tabContent}}</div>
  </el-col>
</template>

<script>
export default {
  name: 'hello',
  props: [
    'info'
  ],
  data () {
    return {
      // tabContent: '项目管理',
      // imgUrl: '../assets/project.svg'
    }
  },
  methods: {
    logaaa: function () {
      this.info.selected = true
      this.$emit('changetab')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.tabselected{
  background-color: rgb(85,139,47);
  color: #fefefe !important;
}
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
  height: 12%;
  background-color: rgb(242,242,242);
  border-top: 1px solid rgb(153,153,153);
}
</style>
