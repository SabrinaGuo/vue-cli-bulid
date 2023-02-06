<template>
  <div class="aside-menu">
    <div class="wraps">
      <label>
        縣市：
        <select v-model="currCity">
          <option v-for="c in cityList" :key="c">{{ c }}</option>
        </select>
      </label>
      <label>
        行政區：
        <select v-model="currDistrict">
          <option v-for="d in districtList" :key="d.id">{{ d.name }}</option>
        </select>
      </label>
    </div>

    <div class="wraps">
      <label>
        <i class="fas fa-search-location"></i> 關鍵字搜尋：
        <input type="text" placeholder="請輸入關鍵字" v-model="keywords" />
      </label>
    </div>

    <ul class="store-lists">
      <li
        class="store-info wraps"
        v-for="s in filiteredStores"
        :key="s.id"
        @click="$emit('triggerMarkerPopup', s.id)"
      >
        <h1 v-html="keywordHightlight(s.name)"></h1>

        <div class="mask-info">
          <i class="fas fa-head-side-mask"></i>
          <span>大人口罩: {{ s.mask_adult }} 個</span>
        </div>

        <div class="mask-info">
          <i class="fas fa-baby"></i>
          <span>兒童口罩: {{ s.mask_child }} 個</span>
        </div>

        <div class="mask-info">最後更新時間: {{ s.updated }}</div>

        <button class="btn-store-detail" @click="openInfoBox(s.id)">
          <i class="fas fa-info-circle"></i>
          看詳細資訊
        </button>
      </li>
    </ul>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  name: "asideMenu",
  computed: {
    currCity: {
      get() {
        return this.$store.state.currCity;
      },
      set(value) {
        return this.$store.commit("setcurrCity", value);
      },
    },
    currDistrict: {
      get() {
        return this.$store.state.currDistrict;
      },
      set(value) {
        return this.$store.commit("setcurrDistrict", value);
      },
    },
    keywords: {
      get() {
        return this.$store.state.keywords;
      },
      set(value) {
        return this.$store.commit("setkeywords", value);
      },
    },
    // ...mapState(["stores"]), 已將資料 filter 因此移除此項並新增下方 filiteredStores
    ...mapGetters(["cityList", "districtList", "filiteredStores"]),
    // 側邊欄也要控制燈箱的開關，所以需要加上對應的屬性 showModal 與相關的 mothods
    showModal: {
      get() {
        return this.$store.state.showModal;
      },
      set(value) {
        return this.$store.commit("setshowModal", value);
      },
    },
    // 從列表取得藥局資訊並置入燈箱：將 id 傳至 store 儲存，然後在 列表以及燈箱頁面分別都加上對應的 computed 屬性
    infoBoxSid: {
      get() {
        return this.$store.state.infoBoxSid;
      },
      set(value) {
        return this.$store.commit("setinfoBoxSid", value);
      },
    },
  },
  methods: {
    keywordHightlight(val) {
      //str.replace(regexp|substr, newSubstr|function)
      return val.replace(
        new RegExp(this.keywords, "g"),
        `<span class="highlight">${this.keywords}</span>`
      );
    },
    // 側邊欄也要控制燈箱的開關，所以需要加上對應的屬性 showModal 與相關的 mothods
    openInfoBox(sid) {
      //   console.log(sid);
      this.showModal = true;
      this.infoBoxSid = sid;
    },
  },
  // 若想更新縣市時自動切換到第一個選項時，可使用 watch
  watch: {
    districtList(v) {
      const [arr] = v; // 此陣列為自動帶入一個值，如果又寫了一個新的 arr2 就會有兩個值
      this.currDistrict = arr.name;
    },
  },
};
</script>
<style lang="scss">
.highlight {
  color: #f08d49;
}
</style>
