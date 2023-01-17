<template>
  <h3>SFC 單一元件檔</h3>
  <p>
    透過 Vue CLI 建立新專案之後， src 目錄下會自動新增一個 App.vue
    檔案，檔案由三個部分所組成，分別是：
  </p>
  <ul>
    <li>template：元件的 HTML 模板</li>
    <li>
      script：主要 JavaScript / TypeScript 程式，可以透過 ES Module 的 import
      語法將其他 SFC 檔案引入成為子元件，元件實體物件本身的程式碼必須透過 export
      default 的方式輸出。
    </li>
    <li>
      style：CSS 樣式，，一個 SFC 裡面可以包含多個 style 區塊，為了避免 css
      互相污染，可在 style 標籤上使用 scoped 屬性來使元件間達到樣式的區隔。
      <p>
        注意：在父層元件的樣式加上
        scoped，又希望它能將樣式帶到子元件上，需要改寫父層的 CSS 樣式，用
        ::v-deep( [selector] ) 將選取的目標包起來，就可以將加了 scoped
        後的樣式帶給子元件了。
      </p>
    </li>
  </ul>
  <h4>此 SFC 檔案中的 h4 是紅色，因為下了 scoped 屬性</h4>
  <p>
    Vue.js 透過這三個區塊來表示單一元件，因此這樣的檔案也被稱為單一元件檔
    (Single Component File)
  </p>
  <hr />
  <h3>lang 使用其他語言開發</h3>
  <p>
    當我們利用其他程式語言來轉譯成 Vue SFC，如 template 可以用 pug 開發，script
    可以用 TypeScript 撰寫，甚至 css 可以使用
    sass/scss，除了在使用前必須先安裝對應的 plugin 之外，我們還需要加上對應的
    lang 來指定使用的語言 => template lang="pug"、script lang="ts"、style
    lang="scss"
  </p>
  <hr />
  <h3>Vue CLI 環境設定與打包部署</h3>
  <h5>package.json 專案與套件相依設定檔</h5>
  <p>
    我們專案內的 package.json 檔案裡頭，打開 package.json，並找到"scripts"
    物件可以看到分別已經預先定義好 serve 、 build 以及 lint
    對應的行為，而這樣的指令，就被稱作 npm script。且在 package.json
    裡面，它允許我們省略掉前面的 ./node_modules/.bin/ 路徑。
  </p>
  <p>
    "serve": "./node_modules/.bin/vue-cli-service serve" -> "serve":
    "vue-cli-service serve"
  </p>
  <p>終端機輸入<strong> npm run serve </strong>啟動開發伺服器</p>
  <p>
    當我們專案開發完成時，就可以利用 build 指令，Vue CLI 就會透過
    @vue/compiler-sfc 與各種 Loader 將 SFC 的 .vue 檔案轉譯成瀏覽器看得懂的
    JavaScript .js 檔。打包後的檔案會出現在 dist/ 目錄下，同時 Vue CLI
    也會提示檔案的大小，為確保前端靜態檔案不被瀏覽器暫存，Vue CLI
    預設會將打包後的檔名加上檔案的雜湊值。
  </p>
  <p>ps:雜湊值顧名思義就是透過雜湊演算法產生，進行打包後的檔名都會不太一樣。</p>
  <p>終端機輸入<strong> npm run build </strong>將專案打包</p>
  <hr />
  <h5>相依套件的版本管理</h5>
  <p>
    從 package.json 可以觀察到這個專案所使用的套件，裡面的 dependencies
    代表的是當專案進行打包建置 (build)
    時，要跟著一起被包裝進去，並發佈到線上環境，而 devDependencies
    裡面的套件僅用於開發階段時使用，並不會跟著一起被打包出去。
  </p>
  <p>相依套件版本號前面的 ^ 與 ~ 代表的意義是：</p>
  <p>
    ~ 會找到目前最新的小版本號來安裝，如 "@vue/cli-service": "~4.5.0"
    在安裝時，如果已經有 4.5.9 與 4.6.1 則會選擇 4.5.9 進行安裝。
  </p>
  <p>
    ^ 會找到目前最新的中版本號來安裝，如 "eslint": "^6.7.2" 在安裝時，如果已經有
    7.0.1 、 6.8.1 、 6.7.3，則會選擇在 6.x.x 裡面最新的那個
  </p>
  <hr />
  <h5>vue.config.js 設定檔</h5>
  <p>
    在實際開發時，偶爾我們還是會因應不同場景，會有需要調整設定的時候，像是要調整
    webpack 的參數時，這個時候我們就必須自行建立 vue.config.js
    檔案了，其需要建立在整個專案的根目錄下，像是若不希望打包後的檔名出現雜湊值，就可以在vue.config.js
    加入 filenameHashing: false，存檔後再重新執行 npm run build
    指令打包，這樣生成的檔案名稱就不會再帶有亂數產生的雜湊值了
  </p>
  <h5>開發時的跨網域存取 - proxy-devServer</h5>
  <p>
    devServer-proxy
    只是一個暫時性的後端代理服務，僅在開發階段時有效。當專案打包上線後，若原本的跨域問題未能解決，那麼限制依然存在。
  </p>
  <p>
    使用方式：在 vue.config.js 並新增 devServer 與 proxy 選項，<a
      href="https://book.vue.tw/CH3/3-3-vue-dev-server-build.html#%E9%96%8B%E7%99%BC%E6%99%82%E7%9A%84%E8%B7%A8%E7%B6%B2%E5%9F%9F%E5%AD%98%E5%8F%96-proxy-devserver"
      target="_blank"
      >相關參數細項</a
    >
  </p>
  <h5>多頁式應用 (MPA) 入口設定</h5>
  <p>
    在實際開發時，我們通常不一定每個專案都會做成 SPA (Single-Page Application,
    單頁式應用程式) 的形式，可能會採用傳統的 MPA (Multiple-Page Application,
    多頁式應用程式) 來進行開發，此時便需要自行調整專案裡的 vue.config.js
    檔案來使環境符合開發的需求。
    <a
      href="https://book.vue.tw/CH3/3-3-vue-dev-server-build.html#%E5%A4%9A%E9%A0%81%E5%BC%8F%E6%87%89%E7%94%A8-mpa-%E5%85%A5%E5%8F%A3%E8%A8%AD%E5%AE%9A"
      target="_blank"
      >設定條件</a
    >
  </p>
  <h5>Vue CLI 整合第三方函式庫</h5>
  <p>
    先行安裝欲使用的第三方函式庫 (如 jQuery)，再去修改 App.vue，透過 import $
    from 'jquery' 將 jQuery 引入至元件
  </p>
  <p>
    但放在 dependencies
    的相依套件在打包的時候，會跟著一起被包裝進去，無形中也增加了檔案的大小。若我們希望減少打包後的檔案大小，將
    jQuery 改用外部 script 的方式引入，可到 public/index.html 進行修改，加入
    jQuery cdn 的 script，讓 jQuery 透過 CDN 引入網頁接著再回頭修改
    vue.config.js ，加入 externals 設定，存檔後重新執行 build
    指令，從生成的檔案就可以觀察到，這時 webpack 並未將 jQuery
    打包進專案中，打包後的檔案大小也就減少了許多。<a
      href="https://book.vue.tw/CH3/3-3-vue-dev-server-build.html#vue-cli-%E6%95%B4%E5%90%88%E7%AC%AC%E4%B8%89%E6%96%B9%E5%87%BD%E5%BC%8F%E5%BA%AB"
      target="_blank"
      >詳細說明</a
    >
  </p>
</template>

<script>
export default {
  name: "SfcIntro",
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
