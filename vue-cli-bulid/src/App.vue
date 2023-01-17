<template>
  <h4>我是 h4</h4>
  <SfcIntro></SfcIntro>
  <RouterIntro></RouterIntro>
</template>

<script>
import SfcIntroVal from "./components/sfc-intro.vue";
import RouterIntroVal from "./components/router-intro.vue";

export default {
  name: "App",
  components: {
    SfcIntro: SfcIntroVal,
    RouterIntro: RouterIntroVal,
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 20px;
}
</style>
