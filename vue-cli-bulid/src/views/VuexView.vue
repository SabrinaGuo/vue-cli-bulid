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
      <li>
        actions：作用類似於 mutations，最大的不同在於它不能直接操作 state
        裡面的資料，也因此它可以執行非同步的任務，再將結果回傳給
        <strong>mutations</strong> 去更改狀態。我們可以在 Vue 元件的 created 或
        mounted 階段向 fetch 發送 dispatch，就可以在 Vue
        元件實體建立的同時，向後端發送 API 請求，並在回傳結果後，透過預先定義的
        mutations 來存入 store 了。
        <p>actions 裡面的函式分別接受兩個參數：</p>
        <ul>
          <li>
            context：與 vuex 實體相同的物件，具有相同的方法與屬性，但並不是
            store 本身，可以透過呼叫這個物件對 store 進行操作，如想在某個
            actions 去 dispatch 另一個 actions 時，可以透過
            context.dispatch('...') 來達成。
          </li>
          <li>payload：與 mutations 的 payload 一樣，指的是從外面傳入的值。</li>
        </ul>
      </li>
    </ul>
    <p>
      若 actions 回傳的是 Promise 物件，甚至可以在 this.$store.dispatch(...)
      加上 .then() 來執行後續的動作。
    </p>
    <p style="color: orange">
      ------------------------------------------------
    </p>
    <li>
      modules：當專案越來越大時， state
      存放的資料也會越來越多管理不易，在modules裏面，我們可以針對每一個 module
      分別定義他們的 state、getters、mutations、actions，此時我們可以將 store
      拆分為 moduleA 與 moduleB 兩個模組，到 Vue 元件時，在computed 透過
      mapState 搭配函式來取得 state.moduleA 的資料。同理
      mapGetters、mapMutations、mapActions 也是一樣的做法。
    </li>
    <p style="color: orange">
      ------------------------------------------------
    </p>
    <li>
      rootState：透過 modules 切分模組後，在模組裡存取外層 store
      的資料，需要透過 rootState 來處理。如 getters
      須透過第三與第四參數來分別取得 rootState 與 rootGetters，而 mutations
      則透過 context 來取得 context.rootState。
    </li>
    <p style="color: orange">
      ------------------------------------------------ㄘ
    </p>
    <li>
      namespaced：當不同的模組各自擁有同樣名稱的 mutations 或 actions 時，可以在
      module 內加上 namespaced:true 來避免命名重複導致的錯誤。
      <p>
        在 Module 中需要 dispatch 與 commit ->
        this.$store.dispatch('moduleA/fetchInfo') 與
        this.$store.commit('moduleB/fetchInfo')
      </p>
      <p>
        在 mapMutations 與 mapActions -> ...mapMutations('moduleA',[
        'fetchInfo','...' ]) 與 ...mapActions('moduleB',[ 'fetchInfo','...'
        ])，將 namespaced 指定到第一個參數，就可以順利指定到對應的模組
      </p>
      <p>
        除了在 Vue 元件派發 dispatch 之外也可能會從模組內發送 dispatch 到 root
        的情況，此時只需要在 dispatch 或 commit 加上第三個參數，並指定 {
        root:true } 就可以將 dispatch 或 commit 指定給外層的 root ->
        dispatch('someOtherAction',null,{root:true}) 或
        commit('someMutation',null,{root:true})
      </p>
    </li>
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
      <li>
        mapActions：可在想使用的元件中在 methods 裡使用
        ...mapActions(['xxx'])，然後在 created() 生命週期中去呼叫。
      </li>
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
