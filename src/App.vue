<template>
  <div id="app">
    <AppHeader />
    <SearchContainer />
  </div>
</template>

<script>
import AppHeader from './components/AppHeader.vue';
import SearchContainer from './components/SearchContainer.vue';

export default {
  components: {
    AppHeader,
    SearchContainer
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px; /* 헤더 높이만큼의 마진을 추가 */
}
</style>