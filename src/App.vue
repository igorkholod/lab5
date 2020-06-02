<template>
  <div id="app">
      <NavigationBar v-if="$route.name !== 'Home'"></NavigationBar>
      <router-view></router-view>
  </div>
</template>

<script>

import NavigationBar from '@/components/NavigationBar';

export default {
  name: 'App',
  components: {
    NavigationBar,
  },
};
</script>

<style>
    @import url('assets/styles.css');
    #app {
        height: 100%;
    }
</style>
