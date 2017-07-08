<template>
  <div>
  
    <div v-for="item in reserveInfo" :key="item" style="height:6em;display:flex;font-color:#ddd;">

      <div style="  display: flex;justify-content: center;
                                  flex-direction: column;flex-grow:1;font-size:2em;color:#00AF63;text-align:center;
                                  border-right:1px solid #ddd;">{{item.name[0]}}</div>
      <div style="display:flex;flex-grow:1;padding-left:0.6em;font-size:0.9em;color:#444;
                        flex-direction:column;justify-content:space-around;padding-top:0.7em;padding-bottom:0.7em;">
        <div style="justify-content:space-around;display:flex;">
          <el-tag v-for="tag in item.tags" :key="tag" type="success">{{tag}}</el-tag>
        </div>
        <div>{{item.place}}</div>
        <div>￥{{item.price}}/小时</div>
      </div>
      <div style="display:flex;flex-grow:1;flex-direction: column;background-color:#fafafa;
                        text-align:center;justify-content: center;font-size:1.5em;color:#444;">{{item.status}}</div>
    </div>
  
  </div>
</template>

<script>
export default {
  name: 'reverse',
  data() {
    return {
      reserveInfo: [
        {
          name: '庄心昊',
          tags: ['文科', '数学', '英语'],
          place: '紫金港、玉泉',
          price: 85,
          status: '未查看'
        },
        {
          name: '庄心昊',
          tags: ['文科', '数学', '英语'],
          place: '紫金港、玉泉',
          price: 85,
          status: '未查看'
        }, {
          name: '庄心昊',
          tags: ['文科', '数学', '英语'],
          place: '紫金港、玉泉',
          price: 85,
          status: '未查看'
        }, {
          name: '庄心昊',
          tags: ['文科', '数学', '英语'],
          place: '紫金港、玉泉',
          price: 85,
          status: '未查看'
        }
      ]
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
