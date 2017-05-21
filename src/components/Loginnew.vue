<template>
<div id="container">
  <div id="logo">
    <img src="../assets/houaa-r.png" alt="">
    <h1>猴阿家教</h1>
  </div>
  <div id="form">
    <el-input class="input" placeholder="用户名" v-model="username" />
    <el-input class="input" placeholder="密码" v-model="password" type="password"/>
  </div>
  <div id="button">
    <div>
      <el-button class="button" style="border-width:2px;color:#FFF;border-color:#00B074;background:#00B074;" type="primary">登录</el-button>
    </div>
    <div>
      <el-button class="button" style="border-width:2px;color:#00B074;border-color:#00B074">注册</el-button>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'loginNew',
  data() {
    return {
      username: '',
      password: ''
    }
  }
}
</script>

<style scoped>
#container {
  width: 100%;
  height: 100%;
  background: #FFF;
  display: flex;
  flex-direction: column;
}
#logo {
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 2px;
  flex-grow: 2;
}
#logo img {
  margin-right: 10px;
  height: 50px;
}
#logo h1 {
  font-size: 45px;
  font-weight: 400;
  color: #00B074;
}
#form {
  flex-grow: 2;
  display: flex;
  flex-direction: column;
  padding: 0 25%;
}
#form .input {
  margin-top: 20px;
  font-weight: 600;
  font-size: 15px;
}
#button {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  padding: 0 25%;
}
#button .button {
  width: 100%;
  font-weight: 600;
  font-size: 15px;
  margin-top: 20px;
}
</style>
