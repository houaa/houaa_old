<template>
  <div>
    <router-view></router-view>
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
h3 {
  margin-top: 0em;
  margin-bottom: 0.5em;
  font-weight: bold;
  font-size: 1.2em;
}

</style>
