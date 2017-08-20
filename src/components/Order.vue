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
      <!-- {{orderedOne}} -->
      <div id="Meta" class="Content1">
        <div id="Name">
          <div style="outline:none;font-weight: 800;font-size: 24px;color: rgb(11, 178, 121);width: 95px;border: none;">{{orderedOne.name}}</div>
          <div v-if="orderedOne.sex" style="display: inline-block;position:relative;top:4px;margin-left: 5px;"><img width="20" src="../assets/female.svg"></div>
          <div v-else style="display: inline-block;position:relative;top:4px;margin-left: 5px;"><img width="20" src="../assets/male.svg"></div>
        </div>
        
        <div id="DetailMeta" style="margin-top: 20px;">
          <div id="edu" style="outline:none;color: rgb(187, 187, 187);margin-right:5px;">{{edu[orderedOne.edu]}}</div>
          <div v-if="orderedOne.auth" id="auth">
            <img width="20" style="padding-top:3px;" src="../assets/auth.svg">
          </div>
          <div v-else id="auth" @click="handleAuthClick">
            未认证
          </div>
        </div>

      <div id="rate" style="text-align: right;font-size: 23px;color: #0bb279; font-weight: 600;">
        <div style="color: #000;font-weight: 300;font-size:16px;padding-top: 5px;">
          注册“猴啊”<span style="font-weight: 400;color:rgb(11, 178, 121)">{{Math.floor(((new Date()) - orderedOne.createdAt)/3600000/24)}}天</span>
        </div>
        <div style="margin-top:15px;letter-spacing:2px;">
          {{orderedOne.rate}}
          <i style="font-size: 12px;font-style: normal; font-weight: 400;"> 分</i>
        </div>
      </div>
    </div>

      <div class="Content1">
        <div>薪资</div>
        <div style="font-size:16px">{{orderedOne.salary}}/小时</div>
      </div>

      <div class="Content1">
        <div>地点</div>
        <div style="font-size:16px">{{orderedOne.campus}}</div>
      </div>

      <div class="Content1">
        <div>科目</div>
        <div style="font-size:16px">{{edu[orderedOne.edu]}}</div>
        <div style="font-size:16px">{{getClass()}}</div>
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
            <span style="color:#33BF8F;font-weight:500">请留意您登记在猴啊的联系方式。</span>
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
      buttonText: '下一步',
      edu: ['小学', '初中', '高中', '本科'],
      grades: [['一年级', '二年级', '三年级', '四年级', '五年级', '六年级'], ['初一', '初二', '初三'], ['高一', '高二', '高三'], ['大一', '大二', '大三', '大四']],
      classes: [['全科', '陪读'], ['数学', '科学', '英语', '文科'], ['数学', '理综', '英语', '文综']]
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
        this.prompts = '正 在 生 成 订 单'
      } else if (this.showPay) {
        this.showPay = false
        this.showTeacher = true
      } else if (this.showDone) {
        this.showDone = false
        this.showPay = true
        this.prompts = '正 在 准 备 付 款'
      }
    },
    getClass: function () {
      switch (this.orderedOne.grade) {
        case 0:
          return 0
        case 1:
          return 1
        case 2:
          return 2
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
  display: flex;
  justify-content: space-between;
  display: flex;
  border-bottom: 1px solid #d8d8d8;
  padding-bottom: 20px;
  padding-top: 20px;
}

.Content1>:first-child {
  font-size: 1.2em;
  font-weight: 600;
  color: #000;
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

