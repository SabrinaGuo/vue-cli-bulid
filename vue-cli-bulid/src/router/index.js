import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import scfView from "../views/SCFView.vue";
import UserView from "../views/UserView.vue";
import VuexView from "../views/VuexView.vue";
import MaskView from "../views/MaskView.vue";

//routes 路由比對、陣列型態的內容
const routes = [
  {
    path: "/",
    name: "HomeView",
    component: HomeView,
  },
  {
    path: "/scfView",
    name: "scfView",
    component: scfView,
  },
  {
    path: "/routerView",
    name: "routerView",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/RouterView.vue"),
  },
  {
    path: "/users/:userId",
    name: "UserView",
    component: UserView,
  },
  {
    path: "/vuexView",
    name: "vuexView",
    component: VuexView,
  },
  {
    path: "/maskView",
    name: "vuexmaskViewView",
    component: MaskView,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
