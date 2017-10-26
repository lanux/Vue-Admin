import Vue from "vue";
import VueRouter from "vue-router";
import routeConfig from "./routes";
import {sync} from "vuex-router-sync";
import store from "../store";
import types from "../store/mutation-types";
import auth from "../common/auth";

//加载路由中间件
Vue.use(VueRouter)

//定义路由
const router = new VueRouter({
  routes: routeConfig,
  //mode: 'history'
})

sync(store, router)

const {state} = store

router.beforeEach((route, redirect, next) => {
  if (state.device.isMobile && state.sidebar.opened) {
    store.commit(types.TOGGLE_SIDEBAR, false)
  }
  if (!auth.loggedIn() && route.path !== '/login') {
    next({
      path: '/login',
      query: {redirect: route.fullPath}
    })
  } else {
    next()
  }
})

export default router
