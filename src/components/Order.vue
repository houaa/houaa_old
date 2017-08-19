<template>
  <div class="order-container">
    <div class="order-content">
      <div class="order-section">
        <el-row class="order-head">
          <el-col :span="4">
            <el-button type="primary" icon="arrow-left" @click="toBack()"></el-button>
          </el-col>
          <el-col :span="16" class="head">{{prompts}}</el-col>
        </el-row>
      </div>
    </div>
    <div v-show="showTeacher" class="contents">
      {{orderedOne}}
      <div class="Content1">
        <div>薪资</div>
      </div>

      <div class="Content1">
        <div>地点</div>
      </div>

      <div class="Content1">
        <div>科目</div>
      </div>
    </div>

    <div v-show="showPay" class="contents">
      <div class="pay">
        <div>
          <span>本次交易，猴啊家教</span>
          <span style="color:#33BF8F">不收取任何费用</span>
        </div>
        <div>
          <span style="color:#888;font-size:16px">¥ </span>
          <span style="color:#33BF8F;font-size:40px">0</span>
        </div>
      </div>
    </div>

    <div v-show="showDone" class="contents">
      <div class="Done">
        <div class="Cong">恭喜您！订单已经生效！</div>
        <div class="Notes">
          <p>您可以在
            <span style="color:#33BF8F;font-weight:500">订单管理界面</span>管理和查看本订单。</p>
          <p>我们已为您通知了对方家长，您应该在近期接到家长的联系，
            <span style="color:#33BF8F;font-weight:500">请留意您登机在猴啊的联系方式。</span>
          </p>
        </div>
      </div>
    </div>

    <div class="next">
      <el-button @click="gonext()" size="large" style="width:6em;" type="primary">{{buttonText}}</el-button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      showTeacher: true,
      showPay: false,
      showDone: false,
      prompts: '正 在 生 成 订 单',
      buttonText: '下一步'
    }
  },
  computed: {
    ...mapGetters([
      'orderedOne'
    ])
  },
  methods: {
    toBack: function () {
      if (this.showTeacher) {
        this.showTeacher = false
        this.$router.push('/reserve')
      } else if (this.showPay) {
        this.showPay = false
        this.showTeacher = true
      } else if (this.showDone) {
        this.showDone = false
        this.showPay = true
      }
    },
    gonext: function () {
      if (this.showTeacher) {
        this.showTeacher = false
        this.showPay = true
        this.showDone = false
        this.prompts = '正 在 准 备 付 款'
      } else if (this.showPay) {
        this.prompts = '完 成'
        this.showTeacher = false
        this.showPay = false
        this.showDone = true
        this.buttonText = '去查看'
      } else if (this.showDone) {
        this.$router.push('/reserve')
        this.showTeacher = false
        this.showPay = false
        this.showDone = false
      }
    }
  }
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity .3s
}

.fade-enter,
.fade-leave-to {
  opacity: 0
}
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.order-container {
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  color: #7e7e7e;
}

.head {
  text-align: center;
  font-size: 18px;
  font-weight: 500;
  color: #000;
}

.order-head {
  height: 70px;
  display: -webkit-flex;
  display: flex;
  -webkit-align-items: center;
  align-items: center;
  -webkit-justify-content: center;
  justify-content: center;
  border-bottom: 1px solid #eee;
}

.contents {
  margin: 0 10px;
}

.Content1 {
  padding-bottom: 20px;
  padding-top: 20px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #eee;
}

.Content1>:first-child {
  font-size: 18px;
  font-weight: 500;
  color: #000;
}

.Content1 .salaryInput {
  border: none;
  outline: none;
  width: 30px;
  text-align: right;
  font-size: 17px;
  margin-right: 5px;
  color: #0bb279;
  font-weight: 600;
}

.next {
  margin-top: 50px;
  text-align: center;
}

.pay {
  margin-top: 200px;
  text-align: center;
}

.pay>:first-child {
  margin-bottom: 20px;
  font-size: 16px;
  font-weight: 400;
  color: #888;
}

.cost {
  display: block;
  font-size: 40px;
}

.Cong {
  margin-top: 150px;
  margin-bottom: 100px;
  font-size: 20px;
  color: #000;
  text-align: center;
}

.Notes {
  text-align: center;
  margin: 15px;
  font-size: 13px;
}
</style>

