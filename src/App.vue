<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style lang="scss">
  @font-face {
    font-family: 'TTCommons-Regular';
    src: url('./fonts/TTCommons-Regular.ttf');
  }
  #app {
    width: 1440px;
    margin: 0 auto;
    font-family: 'TTCommons-Regular';
  }
  @import 'base.scss';
  
</style>