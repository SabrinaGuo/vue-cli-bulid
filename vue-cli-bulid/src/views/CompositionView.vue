<template>
  <h3>Composition 介紹</h3>
  <h4>功能與邏輯的重複使用方式：</h4>
  <p>
    自定義指令：指令也有 hook function 可以使用但與生命週期的 hook function
    並無直接關係。
  </p>
  <p>指令的 hook function：</p>
  <ul>
    <li>created：在綁定元素的屬性或事件監聽器前觸發。(時間點在 v-on 以前)</li>
    <li>beforeMount：指令剛被綁定到指定元素，且掛載到付元件之前觸發。</li>
    <li>mounted：指定綁定的元素，掛載到父元件之後觸發。</li>
    <li>beforeUpdate：該元件的 VNode 更新之前觸發。</li>
    <li>updated：該元件的 VNode 以及他的元件被更新之後觸發。</li>
    <li>beforeUnmount：元素卸載前觸發。</li>
    <li>unmount：元素卸載後觸發。</li>
  </ul>
  <p>
    hook function 參數：el (元素本身)、binding、vnode 以及 prevNnode。 vnode 與
    preNnode 是使用此指令的元件的虛擬節點 (即 virtual DOM) 與其前一個虛擬節點。
  </p>
  <p>binding 屬性介紹：</p>
  <ul>
    <li>instance：使用此指令的元件實體。</li>
    <li>value：傳遞給指令的綁定值。</li>
    <li>
      oldValue：綁定值的前一個值，只能在 beforeUpdate 或 updated 的 hook 使用。
    </li>
    <li>arg：傳給此指令的參數。</li>
    <li>modifiers：修飾子，提供開發者自行定義。</li>
    <li>dir：一個物件，在指令被註冊的時候做為參數傳遞。</li>
  </ul>
  <p>ＧＡ 也很適合使用自定義指令唷！</p>
  <hr />
  <p>mixin 語法：提供不同元件內的屬性重複使用，vue 3.0 支援但已不建議使用。</p>
  <hr />
  <p>
    Composition API：將跨元件共用的屬性(如 data、computed、methods 等)
    包裝起來，需要使用的元件在引入進去。
  </p>
  <p>
    注意：被引入到元件內的屬性，必須要以「物件」或是「函式」的形式來將他們引入到元件中。
  </p>
  <p>
    Composition API 與 Optional API 最大差別：元件的實體物件內不會再有
    data、computed、methods 與生命週期 Hooks
    等屬性。原先需要透過「this」來存取的所有屬性在 Composition API
    的語法後通通消失，取而代之的就是 setup()函式。
  </p>
  <p>
    setup：啟動元件的位置，通常會包含生命週期的 Hooks
    以及元件的相關狀態，若不想在此定義也可以透過 import 從外部檔案引進。而在
    setup() 函式的最後也須把給模板解析的內容(包含狀態與事件處理方法等)透過
    return 回傳出去使用。
  </p>
  <p>
    props 與 context 為 setup 的兩個參數，props 物件可以來取得定義在 props
    的內容，而 context 則提供了 attr、slots 以及 emit
    三種屬性分別對應到元件的實體物件上。
  </p>
  <p>
    ref 與
    reactive：ref()可將數值進行包裝(可包裝原始型別的數值以及物件或陣列)並回傳一個響應式的「物件」，且此物件會提供一個
    value 的屬性來更新或讀取這個狀態的數值。包裝後的物片透過 setup() 的 return
    回傳出去後，元件模板就可以觀察這個數值的變化，在模板上也無法加上 value。
    <br />
    reactive()也是來包裝響應式物件，最大的不同是 reactive()
    僅能包裝物件且在存取內部屬性時不用加上 .value。
  </p>
  <p>
    要注意的是搭配 ES6
    解構語法時會將包裝好的響應式狀態抽離出來變成一般數值，為避免這樣的情況在
    setup() 要 return 包裝好的響應式又需要解構時，需使用 ...toRefs(數值)
    使被解構的數值再次獲得響應式的能力並繼續追蹤更新。
  </p>
  <p>
    computed()：功能與 Optional API 一樣，只是為函式寫法，參數為 getters
    函式並回傳一個 ref 物件，因此在存取值的時候要透過 .value
    來存取內部數值。一樣也有 get() set() 來讀寫。但Composition API 已經不提供
    methods 屬性。
  </p>
  <p>
    readonly()：傳入一個物件到
    readonly()函式內便會回傳一個被代理過的「唯讀」物件，無法修改但會隨著原始物件修改而更新。
  </p>
  <p>
    watch() 與 watchEffect()：作用與 Optional API 一樣，可透過陣列方式同時 watch
    多個屬性，只是要注意的是同一個 watch 對應的 callback
    是共用的。如果要分別對不同屬性的更新執行不同對應的動作則可分別寫兩個
    watch()，如果觀察的是一個陣列或物件內的屬性是否被更新，則需要第三個參數：{deep:true}
  </p>
  <p>
    watchEffect() 與 watch() 不同的是 watchEffect() 裡面的 callback 會在 setup
    剛建立時就立即執行一次且不需要指定觀察目標，而是當內部的 callback
    對應的響應式數值更新後「自動執行」也無法取得「更新前」的數值。
  </p>
  <p>
    每一個 watchEffect()
    在呼叫之後都會回傳一個屬於他的停止函式，可以直接呼叫所回傳的函式來停止觀察。(需要一個變數來承接這個
    callback 函式，想停止時便可以呼叫它)
  </p>
  <p>相依性注入：</p>
  <ul>
    <li>
      provide()：在提供狀態的元件加上 provide()
      並將內容指定對應的物件上。如：provide(store.product)
    </li>
    <li>inject()：在取用的元件中透過 inject() inject(store.product)</li>
  </ul>
  <p>
    注意：provide 與 inject
    都只能在現存元件中使用，一但元件銷毀彼此的連結就會失效。
  </p>
  <p>
    生命週期 hooks：原則上與 Optional API 一致，只是需改寫為函式寫法，且只能寫在
    setup() 內且無需 return。
  </p>
</template>
<script>
export default {
  name: "CompositionView",
};
</script>
