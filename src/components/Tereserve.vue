<template>
  <div class="all">
    <h3>全部订单</h3>
    <div class="container" v-for='(student, index) in reservations'>
      <el-row class="student">
        <el-col :span="18">
          <el-row>
            <span class="name">{{student.name}}</span>
            <span class="small">{{student.grade}}</span>
          </el-row>
          <el-row>
            <span class="small">{{student.location}}</span>
            <span class="small">{{student.date}}</span>
          </el-row>
        </el-col>
        <el-col :span="6">
          <el-button v-if="now === ''" v-on:click="accept(student.name, index)" id="accept">接受预约</el-button>
          <template v-else>
            <el-button v-if="now === index" id="accept">已接受</el-button>
            <el-button v-else :disabled="true" id="accept">接受预约</el-button>
          </template>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ReserveList',
  data () {
    return {
      now: '',
      reservations: [{
        name: 'YangKeao',
        grade: '小学二年级',
        location: '小学二年级',
        date: '2017.4.16'
      }, {
        name: 'YangKeao',
        grade: '小学二年级',
        location: '小学二年级',
        date: '2017.4.16'
      }, {
        name: 'YangKeao',
        grade: '小学二年级',
        location: '小学二年级',
        date: '2017.4.16'
      }, {
        name: 'YangKeao',
        grade: '小学二年级',
        location: '小学二年级',
        date: '2017.4.16'
      }, {
        name: 'YangKeao',
        grade: '小学二年级',
        location: '小学二年级',
        date: '2017.4.16'
      }]
    }
  },
  methods: {
    accept (name, index) {
      this.$message(`已接收${name}预约`)
      this.now = index
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
  .all {
    background: #FFF;
    height: 100%;
    padding: 15px;
  }

  h3 {
    color: #000;
    font-size: 18px;
  }

  .container {
    padding: 0 10px;
    color: #000
  }

  .name {
    font-weight: 600;
    margin-right: 10px;
  }

  .small {
    font-size: 15px;
    color: #808080;
    margin-right: 10px;
  }

  .student {
    margin: 20px 0;
    padding-bottom: 10px;
    border-bottom: 1px #dddddd solid;
  }

  #accept {
    text-align: center;
  }
</style>
