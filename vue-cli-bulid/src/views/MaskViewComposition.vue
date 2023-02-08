<template>
  <div id="mask">
    <!-- aside-menu 左側欄 -->
    <asideMenuComposition />

    <!-- 地圖區塊 -->
    <maskMapComposition />

    <lightBoxComposition />
  </div>
</template>

<script>
import { provide } from "vue";
import map from "./../store/map";
import mapStore from "./../store";
import asideMenuComposition from "./../components/asideMenuComposition.vue";
import lightBoxComposition from "./../components/lightboxViewComposition.vue";
import maskMapComposition from "./../components/maskMapComposition.vue";
export default {
  name: "MaskViewComposition",
  components: {
    asideMenuComposition,
    lightBoxComposition,
    maskMapComposition,
  },
  // setup() 本身即可作為替代原本的 created 鉤子，所以我們直接在此呼叫遠端 api 取得資料即可
  setup() {
    //mapStore 作為所有元件的提供者
    provide("mapStore", mapStore);
    provide("map", map);

    mapStore.fetchLocations();
    mapStore.fetchPharmacies();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
#mask {
  display: block;
  width: 100%;
  height: calc(100vh - 294px);
  * {
    box-sizing: border-box;
  }
  > div {
    float: left;
  }
}

.aside-menu {
  width: 25%;
  height: 100%;
  border-right: 1px solid #aaa;
  background-color: #f1f1f1;
  overflow-y: scroll;
  label {
    position: relative;
    margin-right: 2em;
    display: block;
    font-size: 1.2rem;
    line-height: 2;
  }
  select {
    position: absolute;
    margin-top: 0.3rem;
    left: 6rem;
    font-size: 1.2rem;
    width: auto;
    min-width: 110px;
  }
  input {
    padding: 2px 8px;
    font-size: 1.2rem;
    line-height: 2;
    width: 110%;
  }
}

.mask-map {
  position: relative;
  width: 75%;
  height: 100%;
  background-color: #aaa;
  z-index: 10;
  &.full {
    width: 100%;
  }
}

.wraps {
  padding: 1em;
  border-bottom: 1px solid #666;
}

.store-info {
  position: relative;
  cursor: pointer;
  font-size: 1.1rem;
  line-height: 1.8;
  background-color: #fff;
  h1 {
    font-size: 1.5rem;
    font-weight: 500;
    color: #333;
    margin-bottom: 0.3em;
  }
  .mask-info {
    position: relative;
    > span {
      position: absolute;
      left: 1.8rem;
    }
  }
  &::v-deep .highlight {
    color: #f08d49;
  }
  &:hover {
    background-color: #eee;
  }
  .btn-store-detail {
    position: absolute;
    display: block;
    cursor: pointer;
    width: 80px;
    height: 80px;
    text-align: center;
    right: 1.2rem;
    top: 1.5rem;
    font-size: 0.8rem;
    > i {
      display: block;
      font-size: 2rem;
      margin-bottom: 5px;
    }
  }
}

.popup-name {
  font-size: 1.25rem;
}
</style>
