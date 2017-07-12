<template>
  <div>
    <!--<el-button @click="query">查询</el-button>-->
    <div v-for="item in reserveInfos" :key="item" style="height:6em;display:flex;font-color:#ddd;">
  
      <div style="  display: flex;justify-content: center;
                                                        flex-direction: column;flex-grow:1;font-size:2em;color:#00AF63;text-align:center;
                                                        border-right:1px solid #ddd;">{{item.name[0]}}</div>
      <div style="display:flex;width:40%;padding-left:0.6em;font-size:0.9em;color:#444;flex-direction:column;justify-content:space-around;padding-top:0.7em;padding-bottom:0.7em;">
        <div style="justify-content:space-around;display:flex;">
          <el-tag v-for="tag in item.tags" :key="tag" type="success">{{tag}}</el-tag>
        </div>
        <div>{{item.grade}}</div>
        <div>￥{{item.salary}}/小时</div>
      </div>
      <div style="display:flex;width:30%;flex-direction: column;background-color:#fafafa; text-align:center;justify-content: center;font-size:1.5em;color:#444;">
        {{item.status}}</div>
    </div>
  </div>
</template>

<script>
import AV from 'leancloud-storage'
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'reverse',
  data() {
    return {
      reserveInfos: ''
    }
  },
  computed: {
    ...mapGetters([
      'reserveInfo',
      'isReserveDirty'
    ])
  },
  created: function () {
    this.query()
  },
  methods: {
    ...mapMutations([
      'setReserve'
    ]),
    query: function () {
      let self = this
      if (self.reserveInfo && !self.isReserveDirty) {
        self.reserveInfos = self.reserveInfo
        return
      }
      let query = new AV.Query('TeacherMapUser')
      query.include('Teacher')
      query.equalTo('User', AV.User.current())
      query.find().then(result => {
        // self.reserveInfo = result.map(item => {
        //   item.get('Teacher').toJSON()
        // })
        self.reserveInfos = result.map(function (element) {
          let item = element.get('Teacher').toJSON()
          // console.log(element)
          item.status = element.attributes.status
          return item
        })
        self.setReserve(self.reserveInfos)
        console.log('[reserve] fetch from server...')
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.stunm {
  font-size: 13px;
  font-style: italic;
  color: #aaa;
}

.question {
  font-size: 13px;
  color: #aaa;
}

.conv {
  margin-top: 10px;
  border: 1px solid #ddd;
  padding: 10px;
}

.page {
  padding: 15px;
  background-color: white;
  /*margin: 0;*/
}

.content {
  font-size: 14px;
  line-height: 0.8rem;
}

.stitle {
  /*font-size: 1.2rem;*/
  margin-top: 20px;
  font-weight: 600;
}

.section-left {
  padding-top: 1.6rem;
  padding-bottom: 1.6rem;
  padding-left: 1.6rem;
  line-height: 1.8rem;
  /*text-align: center;*/
}
</style>
