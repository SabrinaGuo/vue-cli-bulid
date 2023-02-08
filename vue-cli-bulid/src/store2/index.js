import { createStore } from "vuex";

const moduleMask = {};

export default createStore({
  state: {
    greeting: "此段文字為 store 中的 state 的內容",
    product: "in state 的 product1",
    price: 100,
    quantity: 50,
    //mask=========================================================
    currCity: "臺北市", // 使用者目前所選縣市，預設為 臺北市
    currDistrict: "北投區", // 使用者目前所選行政區，預設為 北投區
    location: [], // 存放 API 回傳的 縣市/行政區的列表資訊
    stores: [], // 存放 API 回傳的所有藥局資訊
    keywords: "", // 關鍵字搜尋
    showModal: false, // 燈箱預設關閉
    infoBoxSid: null, //對應的藥局id
  },
  getters: {
    //售價打八折
    sellingPrice(state) {
      return state.price * 0.8;
    },
    discount(state) {
      return state.quantity > 50 ? 0.8 : 0.9;
    },
    dynamicSellingPrice(state, getters) {
      return state.price * getters.discount;
    },
    //mask=========================================================
    cityList(state) {
      return state.location.map((d) => d.name);
    },
    districtList(state) {
      // 行政區, 利用 Optional Chaining 處理預設值問題
      return (
        state.location.find((d) => d.name === state.currCity)?.districts || []
      );
    },
    // 過濾藥局清單 依縣市、行政區分組
    filiteredStores(state) {
      const { stores } = state;
      // return stores.filter(
      //   (d) => d.county == state.currCity && d.town == state.currDistrict
      // );
      // 新增關鍵字判斷：如果有keywords 先行搜尋，如果沒有則以下拉式選單為主
      return state.keywords
        ? stores.filter((d) => d.name.includes(state.keywords))
        : stores.filter(
            (d) => d.county == state.currCity && d.town == state.currDistrict
          );
    },
    // 目前所選行政區資訊
    currDistrictInfo(state, getters) {
      return getters.districtList.find((d) => d.name === state.currDistrict);
    },
  },
  mutations: {
    setQuantity(state, payload) {
      state.quantity = payload;
    },
    setQuantity2(state, payload) {
      state.quantity = payload;
    },
    //mask=========================================================
    setcurrCity(state, payload) {
      state.currCity = payload;
    },
    setcurrDistrict(state, payload) {
      state.currDistrict = payload;
    },
    setlocation(state, payload) {
      state.location = payload;
    },
    setstores(state, payload) {
      state.stores = payload;
    },
    setkeywords(state, payload) {
      state.keywords = payload;
    },
    setshowModal(state, payload) {
      state.showModal = payload;
    },
    setinfoBoxSid(state, payload) {
      state.infoBoxSid = payload;
    },
  },
  actions: {
    //mask=========================================================
    // 取得行政區的資料
    async fetchLocations({ commit }) {
      const json = await fetch(
        "https://raw.githubusercontent.com/kurotanshi/mask-map/master/raw/area-location.json"
      ).then((res) => {
        return res.json();
      });
      // 透過 commit 來操作 mutations
      commit("setlocation", json);
    },
    // 取得藥局的資料
    async fetchPharmacies({ commit }) {
      const json = await fetch(
        "https://kiang.github.io/pharmacies/json/points.json"
      ).then((res) => res.json());

      // 整理資料格式，拆出經緯度
      const data = json.features.map((d) => ({
        ...d.properties,
        latitude: d.geometry.coordinates[0],
        longitude: d.geometry.coordinates[1],
      }));
      // 透過 commit 來操作 mutations
      commit("setstores", data);
    },
  },
  modules: {
    moduleMask,
  },
});
