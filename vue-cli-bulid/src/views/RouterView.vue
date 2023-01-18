<template>
  <h3>Vue Router 與前後端路由</h3>
  <h5>什麼是路由</h5>
  <p>
    後端路由： 瀏覽器透過不同的網址，向後端的網頁伺服器發送請求
    (Request)，而伺服器接收到瀏覽器的請求後，回應對應的內容給瀏覽器來渲染，這樣的機制就稱為網站路由
    (Routing) ，管理網站路由的程式通常會被稱作 Router
  </p>
  <p>
    前端路由：自 Ajax 技術問世之後，省下了換頁的成本， 透過 JavaScript
    將網頁的內容替換，使用者與網頁畫面的互動不需要重新載入網頁，操作的回饋也更即時，但也遇到了新的挑戰，更新後的內容在網頁重新整理後沒辦法被留存。因網頁是由
    Ajax
    更新的資料，根本沒有「換頁」這個行為，使用者無法使用「上一頁」或是「下一頁」這些動作，幸好後來
    HTML5 新的規範提供了 History API，可以透過 pushState 、 replaceState 來更新
    URL， 同時也提供了 state 物件讓開發者存取網頁的狀態，這就使 JavaScript
    開始獲得控制路由的權利。
  </p>
  <p>
    注意：若要將網站原本後端伺服器控制路由改為前端接手時，
    需要改寫原本的後端路由規則，將所有網址都指向 Vue.js 的單一入口。
  </p>
  <hr />
  <h5>Vue Router 介紹</h5>
  <p>Vue Router 的第一步</p>
  <ul>
    <li>
      安裝 Vue Router：利用 Vue CLI 建立專案，並選取 Router 選項或是透過 npm 或
      yarn 來進行安裝 => npm install vue-router@4 也可以使用 CDN
      方式直接在網頁引用
    </li>
    <li>
      使用 router-view 來當作 Route 的進入點， 並且使用 router-link
      來產生對應的連結，將對應的元件渲染在 router-view 的區塊當中
    </li>
    <li>
      使用 Vue CLI 的讀者，可自行修改 (或新增) route.js
      檔案，使用方式大致上於前面相同，差別只在 routes 元件可以是某個.vue
      檔案，並將其透過 import 的方式引入，接著在 main.js 透過 .use(router)
      加入至 app
    </li>
  </ul>
  <hr />
  <h5>Vue Router 路由設定</h5>
  <p>
    透過 route.js 檔案來設定 Vue Router 的路由，而設定的選項基本上都會放在
    createRouter 這個 Option 裡頭，最重要的就是 history 與 routes 兩個部分：
  </p>
  <p><strong>history 路由模式</strong></p>
  <p>
    Vue Router v3 以前被稱為 mode， v4 開始改為 history， 指的是 Vue Router
    處理前端路由的不同方式，分別是 Hash Mode 以及 HTML5 (History API) Mode
    兩種。
  </p>
  <p>
    Hash 模式：在 HTML5 的 History API 還沒出現之前，想要控制 URL
    又不能換頁，只能透過 URL hash，也就是 #
    (井號)，在網頁裡代表的是「錨點」的含義， # 後面接的是這個網頁的某個位置。
  </p>
  <p>
    在同一個頁面中，若只是改變了 # 後面的文字是不會讓整個網頁重整或重新讀取的，
    而且當 URL Hash
    被更新時，也會增加一筆記錄到瀏覽器的瀏覽歷史裡，也就是說，我們可以透過瀏覽器的「上一頁」或「下一頁」來切換不同的
    # 位置，而且也不會引發頁面的重新讀取。當時的人們就利用 Ajax 搭配 hashchange
    事件，去監聽 URL Hash 的狀態來決定目前顯示的內容。
  </p>
  <p>
    在 Vue Router 裡頭，我們只要將 history 設定為 createWebHashHistory()
    即可開啟 Hash Mode，而 createWebHashHistory() 預設的路徑為 location.pathname
    或 / 根目錄，若想要額外處理則可以在裡面加上路徑的字串，像是
    createWebHashHistory('/folder/')，對應的就是 https://example.com/folder/#
  </p>
  <p>
    好處是無需調整後端的設定，甚至使用 file://
    開頭的檔案協定來直接開啟網頁也能順利運作。
  </p>
  <p>
    缺點是搜尋引擎在收錄頁面的時候，會自動忽略 URL
    裡面帶有#號的部分，因此也不利於網站的 SEO。
  </p>
  <p>
    HTML5 (History API) 模式：可以透過 pushState() 、 replaceState() 的方式更新
    URL， 以及原本就有的 history.go() 、 history.back()
    來指定頁面的路徑切換，同時也提供了 state
    物件來讓開發者暫存與讀取每一頁的狀態。
  </p>
  <p>將 history 設定為createWebHistory() 即可開啟 HTML5(History API) Mode</p>
  <p>
    與 createWebHashHistory() 一樣，createWebHistory()
    也允許我們在裡面加入相對路徑的字串，如 createWebHistory('/folder/')，對應的
    URL 就是 https://example.com/folder/ 。
  </p>
  <p>
    但就需要後端路由搭配，否則當我們重新整理網頁後，就會得到一個 HTTP 404
    找不到網頁的錯誤訊息。
  </p>
  <p><strong>routes 路由模式</strong></p>
  <p>為陣列型態的內容，用來處理路徑與 Vue 實體元件比對的設定。</p>
  <p>
    動態路由：透過 URL 的動態路徑來讓不同的 URL 路徑都能指向同一個 Vue 元件實體
  </p>
  <p>
    注意，當我們使用動態路由切換頁面在同一個元件上，這個元件並不會被銷毀再重新載入，使用
    watch 來監測 this.$route.params.userId 也就是 this.userId 的更新，並再次透過
    this.fetchUserInfo 取得新資料渲染至頁面上。
  </p>
  <p>
    除了 watch 監控 $route.params.userId 的更新之外，也可以利用 Vue Router 的
    beforeRouteUpdate Hook 來取得URL 變更前/後的頁面/元件資訊
  </p>
  <p>
    $route 與 to / from
    物件內提供的資訊分別有：fullPath、hash、matched、meta、name、params、path、query。
  </p>
  <p>
    $route 物件除了提供 $route.params 讓開發者可存取自行定義的變數名稱外
    (如範例中的 userId)，另外也提供 $route.query、 $route.hash 以及 $route.path
    等屬性來對應 URL 的 location.search、location.hash 與 location.pathname
    等資訊
  </p>
  <p>
    自訂路由參數格式：也可以在 path 裡面透過正規表達式 (regexp) 指定 param
    裡面的格式。
  </p>
  <p>
    路由比對失敗 (找不到網頁)：當使用者嘗試透過不存在的 URL
    進行讀取時，我們也可以透過 '/:pathMatch(.*)*'
    來指定「所有的」路由都會連到此元件，含有星號 *
    的路由應該要放在所有規則的最後，以免原本正確的 URL 還沒配對到就被 NotFound
    的規則轉走了
  </p>
  <p>
    非強制的路由參數：也可以透過 ? 問號來指定當某個 param
    可以是有，也可以沒有的比對情況
  </p>
  <hr />
  <p>
    巢狀路由：Vue Router 也允許我們在 router-view 渲染的元件內，再放一層
    router-view，這樣的做法就被稱為「巢狀路由」 (nested
    routes)，或稱「嵌套路由」。小心 children 裡面的 path 不要加上 /
    開頭，否則會被帶回根目錄
  </p>
  <p>
    具名路由：在 routes 物件內，除了 path 之外，我們也可以指定 name
    來作為元件的路由參考
  </p>
  <p>
    具名視圖：在 routes 物件內除了 path 可以取名之外，對應的 router-view
    也可以加上 name 屬性，在 routes 加上components 來指定每一個 router-view
    所對應的 Vue 元，如果我們一個網頁裡面同時包含多個 router-view
    的時候，就是一個很好用的功能。<a
      href="https://book.vue.tw/CH4/4-2-route-settings.html#%E5%85%B7%E5%90%8D%E8%A6%96%E5%9C%96"
      target="_blank"
    >
      使用方式
    </a>
  </p>
  <p>
    巢狀具名視圖：除了首層會有多個 router-view
    的情況，在子層級的元件也有可能出現多個 router-view，需在 routes 的設定中，將
    components 屬性指定於 children 之下，之後使用方式與具名視圖差別不大。
  </p>
  <hr />
  <p>
    路由轉址：在 routes 裡面，除了透過 path 之外，我們也可以加上 redirect
    選項來指定某個路由要轉址到某個目標。在 redirect 加上路徑像是 /，這時就會將
    /home 轉頁到 '/' 的位置，如： { path: '/home', redirect: '/' }。
  </p>
  <p>
    也可以透過 name 來指定轉頁的目標，如：{ path: '/app', redirect: { name:
    'appPage' } }
  </p>
  <p>
    除了直接指定 URL 與 name 之外， redirect 也允許我們透過 function
    的形式來指定目標，如： redirect: to => { return { path: '/search',query: {
    q: to.params.searchText } } }，就可以將 /search/screens
    轉址為/search?q=screens，使原本的 URL path 變成 query string 的一部份
  </p>
  <p>
    提醒：若在 routes 裡面加上 redirect 選項時，原本的 component
    可以被省略，因為當頁面被轉走就永遠看不到這個 component
    了。而唯一的例外是前面講過的「巢狀路由」，若此路由規則同時有 children 與
    redirect 屬性，則必定要有 component 屬性來處理承接 router-view 元件
  </p>
  <p>
    路由別名：與 redirect 轉址類似，路由別名 alias 雖然也能讓使用者在 /home 看到
    / ，也就是 Homepage 的內容，如：{ path: '/', component: Homepage, alias:
    '/home' }，但這個 alias: '/home' 表示當使用者透過/home
    瀏覽網頁時，雖然看到的跟 / 一樣的畫面， 但 URL 仍保持在 /home
    下，不會被強制轉到 /。而在 redirect 的情況下， URL 會被轉到 /
    的位置。也可以同時指定多個別名，透過 children
    與陣列的方式，我們可以同時指定/users 、 /users/list 以及 /people
    所渲染的畫面結果是同樣的。如：children: [ { path: '', component:
    UserList,alias: ['/people', 'list'] },
    ]，如果要在別名路由加上參數，則是要記得在<strong>
      path(非children陣列中的 path) 與 alias 保持一致</strong
    >。
  </p>
  <hr />
  <h5>路由與 Props</h5>
  <p>
    由於 Vue Router 的路由與元件緊密耦合，對元件來說就無法彈性地重複使用，Vue
    Router 允許我們將 $route.params 視為 Props 來使用。們只需要在 routes 加上
    props 屬性，並設定為 true， 這樣就可以將 params 的:id 當作 Props
    傳入元件來使用，模板內容也會更加簡潔。，如果是前面曾經提到過的具名路由，則需要逐一指定是否開啟
    props 的設定。Props 屬性除了前面介紹的 Boolean
    之外，也可以是純物件形式，如： props: ['newsletterPopup']、path:
    '/promotion/from-newsletter'，也可以寫成 function 的樣式=> props: route =>
    ({ query: route.query.q })
  </p>
  <p><strong>非同步載入元件</strong></p>
  <p>
    當我們開發進行到最終階段時，可能會透過如 webpack
    等工具來進行打包，如果我們能將不同的元件在打包時分開成為獨立的模組，並且在需要的時候才將它們載入，像是進入指定的路由才去讀取，
    這時我們就可以利用 Vue Router 所內建的功能：在 component 屬性透過 import
    語法來引入到路由中， 這樣一來無論是打包或者是網站實際執行時，都可以獲得類似
    lazy-loading 也就是需要的時候才去載入的效果，
    當網站的規模越大，對於整體的效能就會有越大的幫助
  </p>
  <hr />
  <h5>router-link 建立路由連結</h5>
  <p>router-link 的各種常見用法：</p>
  <ul>
    <li>
      快速建立一個超連結，達到無需重整即可讀取對應的 Vue.js 元件，並同時更新 URL
      網址的效果
    </li>
    <li>
      to 屬性：可以直接給一段純文字的路徑也可以是物件、搭配具名路由或是搭配參數
    </li>
    <li>
      replace 屬性：不會在瀏覽器留下 URL
      的歷史紀錄但也無法透過「上一頁」或「下一頁」的按鈕來切換狀態
    </li>
    <li>
      active-class 與目前路由配對的樣式：利用 router-link-active 與
      router-link-exact-active 這兩組 Class 名稱來處理目前的 URL
      與頁面上的連結相符的時候加上 active 的 CSS
    </li>
    <li>
      與 v-slot搭配使用：提供的 v-slot 可以有這些屬性=>href:
      解析後的網址，提供給 a 的 href 目標字串、route: 回傳完整的 Route
      、navigate: 觸發路由的事件函式，必要時會阻止此事件、isActive: 若回傳值為
      true，則表示目前路由的 URL 與目標相同，可用來取代預設的
      router-link-active、isExactActive: 若回傳值為 true，則表示目前路由的 URL
      與目標「完全」相同，可用來取代預設的 router-link-exact-active。
    </li>
    <li>
      透過 router.push() / router.replace()
      操作路由：透過程式來做到網站的導頁，就需要透過 Vue Router 所提供的
      router.push() 與 router.replace() 方法
    </li>
  </ul>
  <hr />
  <h5>路由守衛（Navigation Guards）</h5>
  <p>
    作用類似於我們在 1-7 所介紹的生命週期函式，讓我們可以在特定的時機
    (變更路由的前後) 去自動調用它們，分別提供了「全域」、「路由」、「元件」
    這三種情況下不同的 Hook 供開發者們使用。
  </p>
  <ul>
    <li>
      beforeEach (全域)：「每一個」路由要進入之前，都會先經過這裡，在
      router.beforeEach 的 callback 函式內取得 to(即將進入的路由) 與
      from(從何處進入的路由)，可以在這個 callback
      函式裡面執行任何動作，例如身份驗證等等，結果回傳 false
      時，路由的切換將會被禁止， 而回傳值若為 true 或是 undefined
      (預設情況)，則表示路由可以正常執行。，還有第三個參數 next
      用來表示繼續往下執行的 callback，如果沒有呼叫它，路由就會中斷，自 Vue
      Router 4 開始， next 已經不是必要選項了，而且在未來版本的 Vue Router
      極有可能將它移除，只要 router.beforeEach 只要不是回傳 false
      的情況下，路由的切換將會正常執行。
    </li>
    <li>
      beforeResolve (全域)：在路由跳轉前觸發， 但是時間點會晚於
      router.beforeEach 以及非同步路由元件解析以後才被調用，一樣有 to 、 from
      以及 next 三個參數。
    </li>
    <li>
      afterEach (全域)：在路由跳轉結束後才會觸發。它的 callback 函式只有 to 、
      from 不會有 next 參數，因此不會影響路由的跳轉，但多了一個 failure
      參數用來表示路由跳轉失敗。所以我們可以使用 router.afterEach 來搭配像是 GA
      追蹤一類的工具，來記錄使用者的瀏覽紀錄，對於網站行為的分析來說是相當實用的功能。
    </li>
  </ul>
  <ul>
    <li>
      beforeEnter (路由)：不像前面幾組屬於全域型的 Hook，因此只能在 route
      物件內註冊，其作用、行為與前面介紹的 beforeEach 完全一樣，差別在於
      beforeEnter 可以依照 routes 規則來選擇是否要註冊這個 Hook。而 beforeEach
      比較霸道一些，一旦註冊了，整個應用程式的路由都會進入這個 Hook 裡面。
    </li>
    <li>
      元件內的 Navigation Guards Hooks：提供了屬於單一元件內的 Hooks，分別是
      beforeRouteEnter、beforeRouteUpdate 、 beforeRouteLeave 這三種 Hooks。
      <p>
        beforeRouteEnter Hook 在路由尚未進入該元件時被調用，提供了 to, from,
        next 三個參數。要注意的是，beforeRouteEnter Hook 與 beforeCreate 一樣，
        在裡面是拿不到 this
        的，因為元件的實體還沒被建立，不一樣的地方是，我們可以在 next()
        取得元件的實體。
      </p>
      <p>
        beforeRouteUpdate Hook
        會在當路由被改變，但是元件本身仍是同一個的時候被調用，由於原本的元件並未被銷毀，而是更新內容，這個時候就會觸發
        beforeRouteUpdate Hook。內部的參數與 beforeRouteEnter 大致相同，除了沒有
        next() 可用，此時已經可以透過 this 指向元件的實體物件了。
      </p>
      <p>
        beforeRouteLeave Hook
        則是當路由要離開這個元件時被自動調用，提供的參數一樣是 to 以及 from，
        通常會用在詢問使用者是否要跳轉到另一個路由時使用，如果回傳 false
        就可以阻擋使用者路由的跳轉。
      </p>
    </li>
  </ul>
  <p>
    Navigation Guards 執行的順序：beforeRouteLeave 離開目前路由 (元件) ->
    beforeEach 開始進入新路由之前 (全域) -> beforeEnter 開始進入新路由之前
    (路由) -> beforeRouteEnter 路由尚未進入該元件時 (元件) -> beforeResolve
    路由與所搭配的元件已被解析 (全域) -> afterEach 當路由跳轉結束後 (全域) ->
    beforeCreate 元件實體建立前 (Vue Hook) -> created 元件實體已建立 (Vue Hook)
    -> beforeMount 元件實體掛載前 (Vue Hook) -> mounted 元件實體掛載完成 (Vue
    Hook) -> beforeRouteEnter 內的 next() 回呼函式 -> beforeRouteUpdate
    當路由更新時 (僅限同屬一個元件的情況，也可能完全不會發生)
  </p>
  <p>
    注意： 與生命週期的 Hooks 一樣， Vue 3.0 在引進 Composition API 搭配 setup
    之後，與原本 Hooks 的使用方式也有些許不同。
  </p>
</template>

<script>
export default {
  name: "RouterIntro",
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
