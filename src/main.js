// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import 'eventsource-polyfill'
import Vue from "vue";
import frame from "./frame.vue";
import VueRouter from "vue-router";
import routeConfig from "./router";
// import NProgress from "vue-nprogress";
import {sync} from "vuex-router-sync";
import store from "./store";
import axios from "axios";
import filters from "./filters";
import VueProgressBar from "vue-progressbar";
import {TOGGLE_SIDEBAR} from "./store/mutation-types";
import VueLazyload from "vue-lazyload";
import auth from "./auth";
import Element from "element-ui";
import "element-ui/lib/theme-default/index.css";
import ImpPanel from "./components/panel.vue";


Vue.use(Element);

// or with options
Vue.use(VueLazyload, {
  preLoad: 1.3,
  attempt: 1
})

function getBaseUrl(url) {
  var reg = /^((\w+):\/\/([^\/:]*)(?::(\d+))?)(.*)/;
  reg.exec(url);
  return RegExp.$1;
}

// axios.defaults.baseURL = 'https://www.baidu.com';
axios.defaults.baseURL = getBaseUrl(window.location.href);
axios.defaults.headers.common['authUid'] = auth.getUid();
axios.defaults.headers.common['authSid'] = auth.getSid();

Vue.prototype.$http = axios
Vue.axios = axios


//加载路由中间件
Vue.use(VueRouter)
// const options = {
//   latencyThreshold: 200, // Number of ms before progressbar starts showing, default: 100,
//   router: true, // Show progressbar when navigating routes, default: true
//   http: true // Show progressbar when doing Vue.http and Vue.axios default: true
// };
// Vue.use(NProgress, options)

Vue.component(ImpPanel.name, ImpPanel);

const options = {
  color: '#eeeeee',
  failedColor: '#874b4b',
  thickness: '2px',
  transition: {
    speed: '0.2s',
    opacity: '0.6s'
  },
  autoRevert: true,
  location: 'top',
  inverse: false
}

Vue.use(VueProgressBar, options)

//定义路由
const router = new VueRouter({
  routes: routeConfig,
  //mode: 'history'
})

sync(store, router)

const {state} = store

router.beforeEach((route, redirect, next) => {
  if (state.device.isMobile && state.sidebar.opened) {
    store.commit(TOGGLE_SIDEBAR, false)
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

axios.interceptors.response.use(
  response => {
    if (response.data && response.data.code) {
      if (response.data.code === '2001') {
        auth.logout()
      }
    }
    return response;
  },
  error => {
    if (error.response) {
      //全局ajax错误信息提示
      // Element.MessageBox({type:"error",message:error.response.data,title:"温馨提示"});
    }
    return Promise.reject(error);
  });

// const nprogress = new NProgress({parent: '.nprogress-container'})

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

new Vue({
  store,
  // nprogress,
  router,
  el: "#root",
  render: h => h(frame)
})
