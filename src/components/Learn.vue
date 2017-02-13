<template>

  <el-row class="background">
		<el-col :span="4">
				快去催酸奶啊
		</el-col>

		<el-col :span="20">
		</el-col>
  </el-row>
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
.background{
	width: 100%;
	height: 100%;
	background-color: #fff;
	border-radius: 7px;
	border: 2px solid #fff;
}
</style>
