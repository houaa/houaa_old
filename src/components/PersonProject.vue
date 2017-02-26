<template>
  <div style="height: 100%;margin: 0.5rem 2rem 5rem 2rem; overflow: auto; padding-bottom: 100px">
    <el-form >
      <el-form-item label="真实姓名">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="学科">
        <el-input v-model="form.area"></el-input>          
      </el-form-item>
      <el-form-item label="描述">
        <el-input type="textarea" v-model="form.description"></el-input>          
      </el-form-item>
      <el-form-item style="margin-top: 0.5rem;">
        <el-button type="primary" @click="onSubmit">发布活动</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios'
import {mapGetters} from 'vuex'
export default {
  name: 'hello',
  computed: {
    ...mapGetters([
      'postProjectURL',
      'superToken'
    ])
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      projectData: {
        '0101': '高中数学',
        '0111': '高中物理',
        '1011': '高中物理数学'
      },
      form: {},
      formInline: {},
      inline: true
    }
  },
  methods: {
    onSubmit: function () {
      let self = this

      axios.post(self.postProjectURL, {
        'teacher': self.form,
        'token': self.superToken
      }).then(
        response => {
          console.log(response)
        }
      )
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-form-item {
  margin-bottom: 0;
}
.section-content{
  padding-left: 2rem;
  padding-top: 0.8rem;
  padding-bottom: 0.8rem;
  text-align: left;
}
</style>
