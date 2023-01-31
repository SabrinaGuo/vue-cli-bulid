import { createStore } from "vuex";

export default createStore({
  state: {
    greeting: "此段文字為 store 中的 state 的內容",
    product: "in state 的 product1",
    price: 100,
    quantity: 50,
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
  },
  mutations: {
    setQuantity(state, payload) {
      state.quantity = payload;
    },
    setQuantity2(state, payload) {
      state.quantity = payload;
    },
  },
  actions: {},
  modules: {},
});
