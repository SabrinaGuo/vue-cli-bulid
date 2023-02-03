<template>
  <nav>
    <router-link to="/">首頁</router-link> |
    <router-link to="/scfView">SFC 介紹</router-link> |
    <router-link to="/routerView">Router 介紹</router-link> |
    <router-link to="/vuexView">Vuex 介紹</router-link> |
    <router-link to="/maskView">口罩地圖</router-link>
  </nav>
  <h4>在 app.vue 中的 css 寫上 h4 是粉紅色，會影響到子層們的 css</h4>
  <h5>若是在 style 標籤中寫上 scoped 則僅影響自身</h5>
  <p>動態路由範例切換</p>
  <ul class="list-idx">
    <li v-for="i in 5" :key="i">
      <router-link :to="`/users/${i}`">/users/{{ i }} </router-link>
    </li>
  </ul>
  <router-view />
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.list-idx {
  display: flex;
  list-style: none;
  padding: 0;
  li {
    margin: 5px;
  }
}
h4 {
  color: lightcoral;
}
nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
<style scoped>
h5 {
  color: cadetblue;
}
</style>
