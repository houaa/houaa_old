<template>
<div>
  <header>
    <div id="logo">
      <img src="../assets/houaa-r.png" alt="">
      <h1>猴阿家教</h1>
    </div>
  </header>
  <router-view></router-view>
</div>
</template>
<script>
export default {
  name: 'teacher'
}
</script>
<style scoped>
#logo {
  display: flex;
  align-items: center;
  letter-spacing: 2px;
  flex-grow: 2;
  padding: 0 20px;
}
#logo img {
  margin-right: 10px;
  height: 25px;
}
#logo h1 {
  font-size: 25px;
  font-weight: 500;
  color: #0bb279;
}
</style>
