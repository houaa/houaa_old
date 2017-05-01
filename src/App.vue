<template>
  <div>
    <router-view></router-view>
    <Hello/>
  </div>

</template>

<script>
  import Hello from './components/Hello'
  export default {
    name: 'app',
    components: {
      Hello
    }
  }
</script>

<style>
#app{
    /*height: 100%;
    position: absolute;
    width: 100%;
    background-color: #21B046;
    overflow: hidden;*/
}
</style>
