<template>
  <div>
    <h1>{{ msg }}</h1>
    <h2>{{$route.params.id}}</h2>
    <router-view></router-view>
  </div>
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

</style>
