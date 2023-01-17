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
      使用 router-view 來當作 Route 的進入點， 並且使用 router-link
      來產生對應的連結
    </li>
  </ul>
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
