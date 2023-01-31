<template>
  <h3>Vuex 介紹</h3>
  <section>
    <p>
      vuex 提供 Store(倉庫)本質上也類似 window
      全域物件，任何元件都能去存取，只是它是一個受限制的物件，存取時必須遵守他的規定，如此便能避開在過去動不動就修改全域物件的災難。除此之外，因
      Vue.js 資料的響應式更新特性，所以只要引入了 vuex 元件，都能在 Store
      裡的狀態被改變的時候，同步更新到所有引用的元件裡，同時也利用 module(類似
      namesapce) 來將儲存的狀態、方法等進行分類。
    </p>
    <h5>特性：</h5>
    <h5>
      1.單一資訊來源: vuex 的 store 為單一資訊來源(SSOT, Single Source Of
      Truth)，這份資料應統一由一個源頭進行管理，好處是除錯時需要檢查的地方變少且引用這份狀態的元件們皆能達到狀態完全統一的結果。
    </h5>
    <h5>
      2.單向資料流:執行中須確保狀態的流動是「單一性」的，因無法確本資料更新的來源為何時，就無法追蹤這份資料被誰修改就會雜亂且不受控制。而vuex的資料流是單向的，也因此在
      Vue.js
      的響應式更新才能落實到每個元件，不需要透過迴圈一個個去檢查哪個元件狀態是否已經更新完成。
    </h5>
  </section>
  <hr />
  <section>
    <h3>Vuex 核心概念與結構</h3>
    <p>主要結構：</p>
    <ul>
      <li>state：放置共用狀態的地方。範例：{{ greeting }}</li>
      <p style="color: orange">
        ------------------------------------------------
      </p>
      <li>
        getters：store 中的
        computed，將需要先行計算好的部分在此處先行處理後再讓其他元件引用，達成「單一資訊來源」而非在各元件中自行計算而造成不一致的情況。如：
        打八折為
        {{ sellingPrice }}
        <p>
          且 getters 除了取得 state 的資料之外，也可以在裡面取得另一個 getters
          的資訊，如打八折的折扣改由依照 quantity 的存量來決定時，小於 50
          時打九折，大於 50 則打八折，<strong>{{ dynamicSellingPrice }}</strong>
        </p>
      </li>
      <p style="color: orange">
        ------------------------------------------------
      </p>
      <li>
        mutations：修改 state 的「唯一」方式是透過提交(commit)某個 ,mutations
        的屬性。也可以看作是某種類似「事件」的機制，當這事件被觸發就可以透過他所對應的
        callback 函式去更新 state 裡面的狀態，所以也需要注意我們在提交某個
        mutations 時，需要使用字串形式去呼叫使用它
        <p>
          修改方式：在 mutations 定義一個函式裡面會有兩個參數，為 state
          與傳遞進來的數值 payload，之後再想要修改的元件中，在 methods
          中新增一個函式可綁定在點擊事件上，點擊後元件就會像 store 去提交
          setQuantity 這個 mutations，並將 修改數值 傳遞出去。
        </p>
        <p>
          也可以傳遞「物件」型態的資料，記得在 mutations 取值時要注意取值方式
        </p>
        <p>
          此外因為修改 state 的唯一方式是透過提供某個 mutations 的屬性，所以在
          mutations 裡面所有操作都必須是「同步」的任務，如此 vuex
          才有辦法紀錄與追蹤我們對 store 的每一次修改，也因此我們無法在
          mutations 使用 async/await 或 promise 等非同步的操作。
        </p>
        <p>更新 store 中的 quantity 數值範例：</p>
        <p>
          <strong>quantity:{{ quantity }}</strong>
        </p>
        <input type="text" v-model.number="qty" />
        <button @click="updateQty">點擊更新store 中的 quantity</button>
        <p></p>
        <button @click="setQuantity2(qty)">
          點擊更新store 中的 quantity-使用 mapMutations
        </button>
      </li>
      <p style="color: orange">
        ------------------------------------------------
      </p>
      <li>actions：</li>
    </ul>
    <p style="color: orange">
      ------------------------------------------------
    </p>
    <p>多筆資料可使用：</p>
    <ul>
      <li>
        mapState：可引用多筆狀態。{{ product }}的 price： {{ price }} 、
        quantity：{{ quantity }}，ps:建議使用 ES6
        的解構語法來撰寫，這樣就可以繼續在 computed 新增其他的屬性
      </li>
      <li>
        mapGetters：使用方法與 mapState 大同小異，一樣建議使用 ES6 的解構語法
      </li>
      <li>
        mapMutations：一樣透過 mapMutations 將 setQuantity2
        引入且會將隱含此方法的參數自動帶入 payload
        的功能，只需要注意在模板上引用時需加上參數將其傳遞出去
      </li>
      <li></li>
    </ul>
    <img
      src="./../assets/vuex.png"
      alt=""
      style="width: 100%; max-width: 50%"
    />
    <p></p>
  </section>
</template>

<script>
import { mapMutations, mapState } from "vuex";

export default {
  name: "VuexView",
  data() {
    return {
      qty: 0,
    };
  },
  computed: {
    greeting() {
      return this.$store.state.greeting;
    },
    ...mapState(["product", "price", "quantity"]),
    sellingPrice() {
      return this.$store.getters.sellingPrice;
    },
    dynamicSellingPrice() {
      return this.$store.getters.dynamicSellingPrice;
    },
  },
  methods: {
    updateQty() {
      this.$store.commit("setQuantity", this.qty);
    },
    //可以用此方法引入，但要注意 模板上呼叫 setQuantity2 時需要加入參數
    ...mapMutations(["setQuantity2"]),
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 10px 0;
}
h5 {
  font-size: 16px;
}
ul {
  list-style-type: disc;
  padding: 0;
}
li {
  display: block;
  margin: 5px;
}
a {
  color: #42b983;
}
p {
  line-height: 1.8;
}
</style>
<style scoped>
h4 {
  color: red;
}
</style>
